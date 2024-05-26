# Simple URL Shortener

This is a simple URL shortener that I created using Next.js and Vercel to deploy it.

## Development

To run this project locally, you can use the following commands:

```bash
bun install
bun run drizzle:push
bun dev
```
> You can also use `yarn` or `npm` instead of `bun`.

For Database, I'm using Vercel Storage. You will be able to adapt your needs. Open `example.env` and rename it to `.env` and fill the variables.


## API

To create a new short URL, you can use the following endpoint:

```bash
curl --request POST \
  --url http://localhost:3000/api/trpc/short \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

<details>
<summary>Using Fetch API</summary>

```javascript
const url = 'http://localhost:3000/api/trpc/short';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"url":"https://google.com"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

</details>

<details>
<summary>Returns</summary>

```json
{
  "result": {
    "data": {
      "success": true,
      "slug": "jnzfx",
      "url": "http://localhost:3000/jnzfx",
      "longUrl": "https://google.com"
    }
  }
}
```
