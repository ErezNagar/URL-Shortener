var URLCodec = require("../url-codec.js");

describe("URL codec tests:", function() {
    describe("encoding", function() {
        it("should not encode negative numbers", function() {
            expect(URLCodec.encode(-1)).toBe("");
        });

        it("should not encode non-numeric values", function() {
            expect(URLCodec.encode("non-numeric")).toBe("");
        });

        function encode(num, res){
            it("should encode " + num + " to " + res, function() {
                expect(URLCodec.encode(num)).toBe(res);
            });
        }

        encode(0, "a");
        encode(1, "b");
        encode(62, "ba");
    });

    describe("decoding", function() {
        it("should not decode numeric values", function() {
            expect(URLCodec.decode(-1)).toBe("");
            expect(URLCodec.decode(0)).toBe("");
            expect(URLCodec.decode(1)).toBe("");
        });

        it("should return -1 for invalid characters", function() {
            expect(URLCodec.decode("#")).toBe(-1);
        });

        function decode(string, res){
            it("should encode " + string + " to " + res, function() {
                expect(URLCodec.decode(string)).toBe(res);
            });
        }

        decode("a", 0);
        decode("b", 1);
        decode("ba", 62);
    });

    describe("codec", function() {
        function codec(num, str){
            it("should successfully encode and decode " + num, function() {
                var encoded = URLCodec.encode(num);
                var decoded = URLCodec.decode(encoded);
                expect(num).toBe(decoded);
            });
        }

        for (var i = 0; i < 10; i++)
            codec(Math.floor(Math.random() * Math.pow(62, 2)));

        for (var i = 0; i < 10; i++)
            codec(Math.floor(Math.random() * Math.pow(62, 8)));
    });
});