# Customer IDs Manager - React Client

This project is based on the [React Router framework](https://reactrouter.com/).

![image](https://i.ibb.co/99Wc7ByS/Cloud-Zone-Client-1.png)

<br>

## Working with the app

The app allows you to add, delete, or check the existence of customer IDs.
![image](https://i.ibb.co/fWNkVBz/Screenshot-2025-09-28-at-7-36-50.png)

You will get a validation error if you try to add an ID that already exists,
OR if you try to delete one that doesn't exist.

![image](https://i.ibb.co/MDjJJ8nz/Screenshot-2025-09-28-at-7-37-46.png)
![image](https://i.ibb.co/4gN02t6Y/Screenshot-2025-09-28-at-7-38-24.png)

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
