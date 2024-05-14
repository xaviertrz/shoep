const { exec } = require('child_process');

console.log("Building backend...");
exec("prisma generate && npx tsc -p tsconfig.prod.json", (err, stdout, stderr) => {
    if (err) {
        console.error(`Error building backend: ${err}`);
        return;
    }
    console.log(stdout);

    console.log("Building frontend...");
    exec("cd client && npm run build", (err, stdout, stderr) => {
        if (err) {
            console.error(`Error building frontend: ${err}`);
            return;
        }
        console.log(stdout);
        console.log("Build complete!");
    });
});