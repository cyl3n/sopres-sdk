// smoke-test.js
const { SopresClient, createsoPres, soPres } = require("@sopres/sdk");

async function smokeTest() {
    console.log("🚀 Starting soPres SDK Smoke Test (PascalCase Edition)...");

    try {
        // Test 1: New class name
        const client1 = new SopresClient({
            apiUrl: "https://api.sopres.de/v1",
            apiKey: "test_key",
        });
        console.log("✅ Client instantiated via 'new SopresClient()' successfully.");

        // Test 2: Factory function (remains same)
        const client2 = createsoPres({
            apiUrl: "https://api.sopres.de/v1",
        });
        console.log("✅ Client instantiated via 'createsoPres()' successfully.");

        // Test 3: Backward compatibility alias
        const client3 = new soPres({
            apiUrl: "https://api.sopres.de/v1",
        });
        console.log("✅ Client instantiated via deprecated 'new soPres()'successfully.");

        // Verify API structure
        const apiSections = ["content", "auth", "media", "projects"];
        apiSections.forEach(section => {
            if (client1[section]) {
                console.log(`✅ API Section '${section}' is present.`);
            } else {
                throw new Error(`❌ API Section '${section}' is missing!`);
            }
        });

        console.log("\n✨ Smoke Test Passed! SDK now follows PascalCase standards.");
    } catch (error) {
        console.error("❌ Smoke Test Failed:", error.message);
        process.exit(1);
    }
}

smokeTest();
