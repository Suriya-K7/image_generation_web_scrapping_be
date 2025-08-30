class HTTPResponseBuilder {
  constructor() {
    /**
     * Status code that corresponds to the response
     */
    this.statusCode = 200;

    /**
     * HTTP response headers
     */
    this.headers = {
      "Content-Type": "application/json",
    };

    /**
     * Multivalue headers for HTTP response
     */
    this.multiValueHeaders = {};

    /**
     * Flag indicating whether the body is base64 encoded
     */
    this.isBase64Encoded = false;

    /**
     * JSON body to be sent
     */
    this.body = {};
  }

  /**
   * Set the status code.
   * @param {number} statusCode HTTP status code
   * @returns {this}
   */
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  /**
   * Set the headers.
   * @param {Object} headers HTTP headers
   * @returns {this}
   */
  setHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  /**
   * Set the multi-value headers.
   * @param {Object} multiValueHeaders HTTP multi-value headers
   * @returns {this}
   */
  setMultiValueHeaders(multiValueHeaders) {
    this.multiValueHeaders = {
      ...this.multiValueHeaders,
      ...multiValueHeaders,
    };
    return this;
  }

  /**
   * Set the isBase64Encoded flag.
   * @param {boolean} isBase64Encoded Boolean flag indicating if the body is base64 encoded
   * @returns {this}
   */
  setIsBase64Encoded(isBase64Encoded) {
    this.isBase64Encoded = isBase64Encoded;
    return this;
  }

  /**
   * Set the body.
   * @param {Object} body JSON body object
   * @returns {this}
   */
  setBody(body) {
    this.body = body;
    return this;
  }

  /**
   * Build the JSON response.
   * @returns {Object} response to be returned by lambda function
   */
  build() {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      multiValueHeaders: this.multiValueHeaders,
      isBase64Encoded: this.isBase64Encoded,
      body: JSON.stringify(this.body),
    };
  }
}

module.exports = HTTPResponseBuilder;
