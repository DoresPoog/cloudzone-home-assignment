# Customer IDs Manager - React Client

This project is based on the [React Router framework](https://reactrouter.com/).

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

This will create a *build* folder inside the root folder of the project with all the relevant files ready to be deployed.

## Deployment

### DIY Deployment

Upload the files inside *build/client* to the following S3 Bucket:
`arn:aws:s3:::cloudzone-home-assignment-client`

The index.html file should be at the root level in the bucket.

The app can be accessed from [here](http://cloudzone-home-assignment-client.s3-website.il-central-1.amazonaws.com/).

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/).
