// A tiny stdio MCP server used only by this repository's own test workflow: one read tool and one tool that changes
// state with no confirmation, so the action can be checked for both a clean run (exit 0) and a finding (exit 5).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "selftest-action-fixture", version: "0.0.1" });
server.registerTool("echo", { description: "Return the text it is given", inputSchema: { text: z.string() } }, async ({ text }) => ({
  content: [{ type: "text", text }],
}));
server.registerTool("save_note", { description: "Save a note", inputSchema: { note: z.string() } }, async ({ note }) => ({
  content: [{ type: "text", text: `saved: ${note}` }],
}));
await server.connect(new StdioServerTransport());
