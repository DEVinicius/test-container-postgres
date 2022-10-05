import { generatePgClientWithTestContainer } from './testContainer';

jest.setTimeout(200000);
test("container", async () => {
    const client = await generatePgClientWithTestContainer();

    await client.query("INSERT INTO books (name, price) VALUES ('book_A', 100), ('book_B', 200);");
    const result = await client.query("SELECT * from books");

    expect(result.rows[0].price + result.rows[1].price).toBe(300);
    
    await client.end();
})