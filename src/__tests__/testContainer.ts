import { GenericContainer } from 'testcontainers'
import { Client } from "pg"

export async function generatePgClientWithTestContainer(): Promise<Client> {
    const container = await GenericContainer.fromDockerfile(__dirname + '/../..').build();
    const testContainer = await container
        .withEnv("POSTGRES_USER", "vinicius")
        .withEnv("POSTGRES_PASSWORD", "vini")
        .withEnv("POSTGRES_DB", "vinicius_db")
        .withExposedPorts(5432)
        .start()

    const client = new Client({
        user: "vinicius",
        password: "vini",
        database: "vinicius_db",
        host: testContainer.getHost(),
        port: testContainer.getMappedPort(5432),
    });

    await client.connect();
    return client;
}