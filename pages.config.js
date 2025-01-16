export default {
  // Specify build settings
  build: {
    command: "npm run build",
    directory: "dist",
    includeFiles: ["public/_headers", "public/_redirects"],
  },
  // Environment variables if needed
  env: {
    NODE_VERSION: "18"
  }
}
