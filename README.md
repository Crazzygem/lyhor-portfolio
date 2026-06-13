# Lyhor Portfolio

A minimal, clean graphic design portfolio for **Kimhornn Lyhor** — built with **Astro + Tailwind CSS**, packaged with **Docker** for easy deployment.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start dev server (hot reload)
npm run dev
```

Open **http://localhost:4321**

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg
│   ├── icons/              ← Adobe tool logos
│   └── images/             ← Portfolio showcase images
├── src/
│   ├── components/
│   │   ├── Navbar.astro     ← Sticky nav with mobile menu
│   │   ├── Hero.astro       ← Name, title, CTA
│   │   ├── About.astro      ← Bio
│   │   ├── Skills.astro     ← Adobe Suite + soft skills
│   │   ├── Work.astro       ← Masonry gallery
│   │   ├── Experience.astro ← Work history + education
│   │   └── Contact.astro    ← Email, phone, location
│   ├── layouts/Layout.astro
│   ├── pages/index.astro    ← Main single page
│   └── styles/global.css    ← Tailwind + custom styles
├── Dockerfile               ← Multi-stage Docker build
├── nginx.conf               ← Production Nginx config
├── .gitignore
└── .dockerignore
```

---

## 🐳 Docker Deployment

### How It Works

The Docker setup uses a **multi-stage build** (two phases):

```mermaid
graph TD
    subgraph S1["Stage 1: BUILD (node:22-alpine)"]
        A["package.json + source code"] --> B["npm ci --legacy-peer-deps"]
        B --> C["npm run build"]
        C --> D["/app/dist/ (static HTML files)"]
    end

    D -->|"COPY --from=build"| E

    subgraph S2["Stage 2: SERVE (nginx:alpine)"]
        E["Static files in /usr/share/nginx/html"]
        E --> F["Nginx serves on port 80"]
        F --> G["• Gzip compression<br/>• Image caching (7-30 days)<br/>• Security headers"]
    end

    style S1 fill:#1e3a5f,stroke:#0f2440,color:#ffffff
    style S2 fill:#1b4332,stroke:#0d2818,color:#ffffff
    style A fill:#e8f0fe,stroke:#1e3a5f
    style B fill:#e8f0fe,stroke:#1e3a5f
    style C fill:#e8f0fe,stroke:#1e3a5f
    style D fill:#c7d9f7,stroke:#1e3a5f
    style E fill:#d8f3dc,stroke:#1b4332
    style F fill:#d8f3dc,stroke:#1b4332
    style G fill:#b7e4c7,stroke:#1b4332
```

**Key points:**
- **Stage 1 (Build):** Node.js installs dependencies and builds the Astro site into static HTML files (`dist/`)
- **Stage 2 (Serve):** Takes only the built files + lightweight Nginx Alpine (~25MB final image)
- The result is a **tiny, production-ready Docker image** (~32MB) with zero runtime dependencies

### Build & Run

```bash
# Build the Docker image
docker build -t lyhor-portfolio .

# Run the container (serves on http://localhost:80)
docker run -d -p 80:80 --restart unless-stopped lyhor-portfolio

# Run on a different port (e.g., 8080)
docker run -d -p 8080:80 --restart unless-stopped lyhor-portfolio

# Stop the container
docker stop <container-id>

# View running containers
docker ps
```

### Nginx Configuration

The custom `nginx.conf` handles:

| Feature | Setting | Benefit |
|---------|---------|---------|
| Gzip compression | On for text/CSS/JSON/SVG | Smaller downloads, faster page loads |
| Icon caching | 30 days (immutable) | Icons load instantly on repeat visits |
| Image caching | 7 days | Portfolio images cached for a week |
| Security headers | X-Frame-Options, X-Content-Type-Options | Prevents clickjacking, MIME sniffing |

---

## ☁️ Deploy to Ubuntu LXC Container

### Option A: Docker (Recommended)

```bash
# 1. Install Docker
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker

# 2. Clone the repo
git clone https://github.com/YOUR_USER/lyhor-portfolio.git
cd lyhor-portfolio

# 3. Build & run
docker build -t lyhor-portfolio .
docker run -d -p 80:80 --restart unless-stopped lyhor-portfolio

# 4. Verify
curl http://localhost
```

### Option B: Direct Nginx (No Docker)

```bash
# 1. Install Nginx + Node.js
sudo apt update
sudo apt install -y nginx nodejs npm

# 2. Clone and build
git clone https://github.com/YOUR_USER/lyhor-portfolio.git
cd lyhor-portfolio
npm install --legacy-peer-deps
npm run build

# 3. Copy built files to nginx
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---

## ✏️ How to Update Content

### For your friend (developer):
1. Clone the repo: `git clone <url>`
2. Install: `npm install --legacy-peer-deps`
3. Edit components in `src/components/`
4. Preview: `npm run dev`
5. Build: `npm run build`
6. Re-deploy: `docker build -t lyhor-portfolio . && docker run -d -p 80:80 lyhor-portfolio`

### Adding new portfolio images:
1. Place images in `public/images/`
2. Edit `src/components/Work.astro` — add the filename to the `projects` array
3. Rebuild & redeploy

---

## 🛠 Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (localhost:4321) |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview built site |
| `docker build -t lyhor-portfolio .` | Build Docker image |
| `docker run -d -p 80:80 lyhor-portfolio` | Run container |
| `docker ps` | List running containers |
| `docker stop <id>` | Stop container |

---
