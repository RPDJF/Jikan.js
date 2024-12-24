import { APIRequestQuery, APIRequestPromise } from "./api.ts";
import { JikanClient } from "./client.ts";

export class RequestQueue {
	private _queue: (APIRequestPromise)[] = [];
	private _size: number = 0;
	private _maxSize: number;

	public get size(): number { return this._size; }
	public get maxSize(): number { return this._maxSize; }
	public get isEmpty(): boolean { return this._size === 0; }
	public get isFull(): boolean { return this._size === this._maxSize; }

	public constructor(maxSize: number) {
		this._maxSize = maxSize;
	}

	/**
	 * enqueue: Add an item to the queue
	 * 
	 * @returns The identifier of the item
	 * @throws Error if the queue is full
	 */
    protected enqueue(requestPromise: APIRequestPromise) {
        if (this._size === this.maxSize && this.maxSize) {
            throw new Error("Internal library request queue is full", { cause: "QueueFull" });
        }
        this._queue.push(requestPromise);
        this._size++;
    }

	/**
	 * dequeue: Remove an item from the queue
	 * 
	 * @returns The item that was removed or undefined if the queue is empty
	 */
	protected dequeue(): APIRequestPromise | undefined {
        if (this._size === 0) {
            return undefined;
        }
        const item = this._queue.shift();
        this._size--;
        return item;
    }
}

export class RequestManager extends RequestQueue {
	public readonly client: JikanClient;
	private _isProcessing: boolean = false;

	constructor(client: JikanClient) {
		super(client.options.maxPendingRequests);
		this.client = client;
	}

	public buildURL(requestQuery: APIRequestQuery): URL {
		return new URL(`${this.client.options.host}/${this.client.options.baseUri}/${requestQuery.endpoint}${requestQuery.params ? `?${new URLSearchParams(requestQuery.params)}` : ""}`);
	}

	public async processQueue() {
		if (this._isProcessing) {
			console.debug("RequestManager: Already processing queue");
			return;
		}
		this._isProcessing = true;
		while (!this.isEmpty) {
			const item: APIRequestPromise | undefined = this.dequeue();
			if (!item) {
				continue;
			}
			console.debug(`RequestManager: Processing request`, item.query);
			const url: URL = this.buildURL(item.query);
			console.debug("RequestManager: Fetching", url);
			const response: Promise<Response> = fetch(url, {
				method: item.query.method,
				cache: "no-store",
				signal: AbortSignal.timeout(this.client.options.timeout)
			});
			if (item.resolve) {
				item.resolve(response);
			}
			await new Promise(resolve => setTimeout(resolve, this.client.options.rateLimit));
		}
		this._isProcessing = false;
	}

	/**
	 * request: Enqueue a APIRequestQuery and return a promise of the response
	 * 
	 * note: Request won't retry if the response isn't valid, it's up to the user to handle the response. Maybe a retry mechanism can be added in the future.
	 * 
	 * note: If the queue is full, the request will be dropped and a 503 Service Unavailable response will be returned (see the client options to change the queue size)
	 * 
	 * @returns promise of the response
	 */
	public request(requestQuery: APIRequestQuery): Promise<Response> {
		console.debug("RequestManager: Enqueueing request", requestQuery);
		return new Promise((resolve) => {
			const requestPromise: APIRequestPromise = {
				query: requestQuery,
				resolve: resolve,
			}
			try {
				this.enqueue(requestPromise);
			} catch (e) {
				if (e instanceof Error && e.cause === "QueueFull") {
					console.error("RequestManager: Queue is full, request dropped", requestQuery);
					resolve(new Response(
						JSON.stringify({
							message: e.message,
							errorCode: e.cause,
							status: 503,
							retryAfter: this.client.options.rateLimit / 1000,
						}), {
						status: 503,
						statusText: "Service Unavailable",
						headers: new Headers({
							"Content-Type": "application/json",
							"Retry-After": (this.client.options.rateLimit / 1000).toString(),
						}),
					}));
				}
				else {
					console.error("RequestManager: Unknown error", e);
				}
			}
			this.processQueue();
		});
	}
}
