// test-impl-onm-xri-parser.js

require('./subtests/xri-parser/test-use-case-xri-parser-bad-input-variants.js');

require('./subtests/xri-parser/test-use-case-xri-parser-root-bad-paths.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-bad-vectors.js');

require('./subtests/xri-parser/test-use-case-xri-parser-root-full-path.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-full-path-strays-off-model.js');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-path-resolved-component.js');

require('./subtests/xri-parser/test-use-case-xri-parser-root-path-unresolved-component.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-invalid-model-version.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-invalid-path-hash.js');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-resolved-component.js');

require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-unresolved-component.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-lri-valid.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-invalid-model-id.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-invalid-path.js');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-resolved-component.js');

require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-unresolved-component.js');
require('./subtests/xri-parser/test-use-case-xri-parser-root-vector-uri-valid.js');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-descend-1.js');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-descend-2.js');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-path.js');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-relative-resolved-component.js');

require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-relative-unresolved-component.js');

// COMPONENT KEY OVERRIDE FEATURE require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-resolved-component.js');

require('./subtests/xri-parser/test-use-case-xri-parser-nested-path-unresolved-component.js');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-vector-lri-valid.js');
require('./subtests/xri-parser/test-use-case-xri-parser-nested-vector-uri-valid.js');

