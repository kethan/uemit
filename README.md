## UEmit

### Example

```ts
interface Events {
	hi: number;
	bye: string;
	tick: number;
	bar?: null | number;
}

const emitter = new Mitt<Events>();

emitter
	.subscribe("tick", async (req) => {
		await sleep(2000);
		req.respond(400);
	})
	.subscribe("hi", async (req) => {
		console.log(req);
		await sleep(100);
		req.respond(req.data * 100);
	})
	.subscribe("bye", (req) => {
		req.respond(`bye ${req.data}`);
	});

let x = await emitter.request("tick", 2);
console.log(x);

x = await emitter.request("hi", 2);
console.log(x);

emitter.subscribe("bar", (r) => {
	console.log("bar");
});

emitter.request("bar", null);

for (let i = 0; i < 10; i++) {
	emitter
		.request("bye", i.toString())
		.then((x) => console.log(x))
		.catch((e) => console.log("e", e));
}

let rs = Array(10).fill(0);
let c = 0;
for await (let m of rs) {
	let x = await emitter.request("hi", ++c);
	console.log(x);
}
console.log("over");
```
