import { app } from "./app";
import { runDB } from "./db/db";

const port = process.env.PORT || 3003;
console.log("PORT: ", port);
const startApp = async () => {
    console.log("Start app");
    await runDB().then(() => {console.log("DB run")}).catch((error) => {console.log("Error: ", error)});
    console.log("DB run");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startApp().then(() => {console.log("App started")}).catch((error) => {console.log("Error: ", error)});

export default app;
