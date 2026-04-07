# satoru-deno-ogp-image

A Deno server that dynamically generates OGP images using [satoru-render](https://www.npmjs.com/package/satoru-render).  
Pass title, author name, and image via URL query parameters to get a PNG OGP image.

## 📸 Sample Output

![Sample OGP image](./document/image.png)

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| [Deno](https://deno.land/) | Runtime / Server |
| [satoru-render](https://www.npmjs.com/package/satoru-render) | HTML → PNG rendering |
| [Preact](https://preactjs.com/) | JSX templating |
| [Tailwind CSS (v4)](https://tailwindcss.com/) | Styling |
| [Deno Deploy](https://deno.com/deploy) | Hosting |

## 🚀 Usage

### Query Parameters

| Parameter | Required | Description | Default |
|---|---|---|---|
| `title` | - | Title displayed on the OGP image | `Title` |
| `name` | - | Author name | `Name` |
| `image` | - | Avatar image URL | None |

### Run Locally

```bash
deno task dev
```

The server starts at `http://localhost:8000`.

### Request Example

```
http://localhost:8000/?title=Hello%20World&name=SoraKumo&image=https://example.com/avatar.jpg
```

### Deploy

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
  main.tsx          # Server & OGP template (JSX)
deno.json           # Deno config (tasks / JSX / entrypoint)
deno.deploy.json    # Deno Deploy config
package.json        # npm dependencies / scripts
document/
  image.png         # Sample output image
```

## ⚙️ How It Works

1. Start an HTTP server with `Deno.serve`
2. Extract `title` / `name` / `image` from query parameters
3. Build the design with Preact JSX + Tailwind CSS → convert to HTML string via `toHtml()`
4. Render the HTML to a **1200×630 PNG image** using `satoru-render`'s `render()`
5. Cache responses via the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) in production
