# Webflow Backend

A Node.js/Express backend API for the Webflow-like editor frontend.

## Features

- ✅ Save and load editor configurations
- ✅ Multiple configuration management
- ✅ Image upload and management
- ✅ CORS enabled for frontend integration
- ✅ Data validation
- ✅ Error handling
- ✅ File-based storage (JSON)

## API Endpoints

### Editor Configuration

- `GET /api/editor/configuration` - Get current configuration
- `GET /api/editor/configuration/:id` - Get specific saved configuration
- `POST /api/editor/configuration` - Save as current configuration
- `PUT /api/editor/configuration/:id` - Save as named configuration
- `DELETE /api/editor/configuration/:id` - Delete saved configuration
- `GET /api/editor/configurations` - Get all saved configurations

### File Upload

- `POST /api/upload/image` - Upload image file
- `DELETE /api/upload/image/:filename` - Delete uploaded image
- `GET /api/upload/images` - List all uploaded images

### Health Check

- `GET /health` - Server health status

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create and configure environment variables:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Start production server:

```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)
- `DATA_PATH` - Data storage directory (default: ./data)
- `UPLOAD_PATH` - Upload storage directory (default: ./uploads)

## Data Storage

The backend uses file-based storage:

- Configuration data is stored in `./data/configurations.json`
- Uploaded images are stored in `./uploads/`

## Configuration Format

```json
{
  "hero": {
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "button": {
      "text": "Button Text",
      "href": "#",
      "textColor": "#000000",
      "bgColor": "#ffffff"
    },
    "bgType": "color",
    "bgColor": "#636ede",
    "bgImage": ""
  },
  "navbar": {
    "logo": "LOGO",
    "links": [{ "label": "Home", "href": "#" }],
    "cta": {
      "label": "CTA Text",
      "href": "#",
      "textColor": "#000000",
      "bgColor": "#ffffff"
    }
  }
}
```
