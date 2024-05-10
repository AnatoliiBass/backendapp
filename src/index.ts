import { app } from "./app";
import { runDB } from "./db/db";

const port = process.env.PORT || 3003;
const startApp = async () => {
    await runDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startApp();

export default app;
