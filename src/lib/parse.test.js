import assert from "node:assert";
import { describe, it } from "node:test";
import { parseQuestions } from "./parse.js";

describe("parseQuestions", () => {
  it("parses a quoted question with escaped quotes", () => {
    const line =
      '6,Tónlist,2,2,"Hvaða hljómsveit gerði lagið ""Rangur maður""",Sólstrandargæjarnir';

    const result = parseQuestions(line);

    assert.deepStrictEqual(result, {
      categoryNumber: 6,
      subcategory: "Tónlist",
      diff: 2,
      quality: 2,
      question: 'Hvaða hljómsveit gerði lagið "Rangur maður"',
      answer: "Sólstrandargæjarnir",
    });
  });

  it("allows empty subcategory but still parses", () => {
    const line = "5,,3,2,Í hvaða landi eru héruðin Epírus og Þrakía,Grikklandi";

    const result = parseQuestions(line);

    assert.deepStrictEqual(result, {
      categoryNumber: 5,
      subcategory: null,
      diff: 3,
      quality: 2,
      question: "Í hvaða landi eru héruðin Epírus og Þrakía",
      answer: "Grikklandi",
    });
  });

  it("uses default quality when value is not numeric", () => {
    const line = "1,Test,2,foo,Spurning,Svar";

    const result = parseQuestions(line);

    assert.deepStrictEqual(result, {
      categoryNumber: 1,
      subcategory: "Test",
      diff: 2,
      quality: 1,
      question: "Spurning",
      answer: "Svar",
    });
  });

  it("returns null when line is empty", () => {
    const result = parseQuestions("");

    assert.strictEqual(result, null);
  });

  it("returns null when answer is missing", () => {
    const line = "1,Test,2,2,Spurning,";

    const result = parseQuestions(line);

    assert.strictEqual(result, null);
  });
});
