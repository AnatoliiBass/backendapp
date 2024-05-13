import { app } from "./app";
import { runDB } from "./db/db";

const port = process.env.PORT || 3003;

const startApp = async () => {
    await runDB().catch((error) => {console.log("Error run DB: ", error)});
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startApp().catch((error) => {console.log("Error start App: ", error)});

export default app;
