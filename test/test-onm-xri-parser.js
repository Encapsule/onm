// test-impl-onm-xri-parser.js

require('./subtests/xri-parser/test-use-case-xri-parser-bad-input-variants');
require('./subtests/xri-parser/test-use-case-xri-parser-anonymous-bad-paths');



require('./subtests/xri-parser/test-use-case-xri-parser-root-bad-paths');
require('./subtests/xri-parser/test-use-case-xri-parser-root-bad-vectors');

require('./subtests/xri-parser/test-use-case-xri-parser-root-full-path');
require('./subtests/xri-parser/test-use-case-xri-parser-root-full-path-strays-off-model');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-path-resolved-component');

require('./subtests/xri-parser/test-use-case-xri-parser-root-path-unresolved-component');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-invalid-model-version');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-invalid-path-hash');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-resolved-component');

require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-unresolved-component');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-valid');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-invalid-model-id');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-invalid-path');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-resolved-component');

require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-unresolved-component');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-valid');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-descend-1');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-descend-2');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-relative-resolved-component');

require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-relative-unresolved-component');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-resolved-component');

require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-unresolved-component');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-vector-lri-valid');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-vector-uri-valid');

