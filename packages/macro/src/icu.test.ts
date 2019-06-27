import ICUMessageFormat from "./icu"

describe("ICU MessageFormat", function() {
  it("should collect text message", function() {
    const messageFormat = new ICUMessageFormat()
    const tokens = [
      {
        type: "text",
        value: "Hello World"
      }
    ]
    expect(messageFormat.fromTokens(tokens)).toEqual(
      expect.objectContaining({
        message: "Hello World",
        values: {}
      })
    )
  })

  it("should collect text message with arguments", function() {
    const messageFormat = new ICUMessageFormat()
    const tokens = [
      {
        type: "text",
        value: "Hello "
      },
      {
        type: "arg",
        name: "name",
        value: "Joe"
      }
    ]
    expect(messageFormat.fromTokens(tokens)).toEqual(
      expect.objectContaining({
        message: "Hello {name}",
        values: {
          name: "Joe"
        }
      })
    )
  })

  it("should collect text message for plural", function() {
    const messageFormat = new ICUMessageFormat()
    const tokens = [
      {
        type: "text",
        value: "Get "
      },
      {
        type: "arg",
        name: "count",
        value: "5",
        format: "plural",
        options: {
          one: [
            { type: "text", value: "# glass of " },
            {
              type: "arg",
              name: "drink",
              value: "Beer"
            }
          ],
          other: [
            { type: "text", value: "# glasses of " },
            {
              type: "arg",
              name: "drink",
              value: "Beer"
            }
          ]
        }
      }
    ]
    expect(messageFormat.fromTokens(tokens)).toEqual(
      expect.objectContaining({
        message:
          "Get {count, plural, one {# glass of {drink}} other {# glasses of {drink}}}",
        values: {
          count: "5",
          drink: "Beer"
        }
      })
    )
  })
})
