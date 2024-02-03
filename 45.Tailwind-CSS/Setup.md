## How to setup Tailwind CSS
Step 1: Run the
following commands
```
npm install -D tailwindcss

npx tailwindcss init
```


Step 2: Update Tailwind.congig.js
```
content: ["*.html"],
```

Step 3: Create src/input/css & add the follwing code to it
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 4: Run the following command
```
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

Step 5: Include the output.css in HTML file
```
<link href="./output.css" rel="stylesheet">
```
