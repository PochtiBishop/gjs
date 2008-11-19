const Everything = imports.gi.Everything;

function testSimpleBoxed() {
    let simple_boxed = new Everything.TestSimpleBoxedA();
    simple_boxed.some_int = 42;
    simple_boxed.some_int8 = 43;
    simple_boxed.some_double = 42.5;
    assertEquals(42, simple_boxed.some_int);
    assertEquals(43, simple_boxed.some_int8);
    assertEquals(42.5, simple_boxed.some_double);
}

function testBoxedCopyConstructor()
{
    // "Copy" an object from a hash of field values
    let simple_boxed = new Everything.TestSimpleBoxedA({ some_int: 42,
							 some_int8: 43,
							 some_double: 42.5 });

    assertEquals(42, simple_boxed.some_int);
    assertEquals(43, simple_boxed.some_int8);
    assertEquals(42.5, simple_boxed.some_double);

    // Make sure we catch bad field names
    assertRaises(function() {
	let t = new Everything.TestSimpleBoxedA({ junk: 42 });
    });

    // Copy an object from another object of the same type, shortcuts to the boxed copy
    let copy = new Everything.TestSimpleBoxedA(simple_boxed);

    assertEquals(42, copy.some_int);
    assertEquals(43, copy.some_int8);
    assertEquals(42.5, copy.some_double);
 }

function testNestedSimpleBoxed() {
    let simple_boxed = new Everything.TestSimpleBoxedB();

    // Test reading fields and nested fields
    simple_boxed.some_int8 = 42;
    simple_boxed.nested_a.some_int = 43;
    assertEquals(42, simple_boxed.some_int8);
    assertEquals(43, simple_boxed.nested_a.some_int);

    // Try assigning the nested struct field from an instance
    simple_boxed.nested_a = new Everything.TestSimpleBoxedA({ some_int: 53 });
    assertEquals(53, simple_boxed.nested_a.some_int);

    // And directly from a hash of field values
    simple_boxed.nested_a = { some_int: 63 };
    assertEquals(63, simple_boxed.nested_a.some_int);

    // Try constructing with a nested hash of field values
    let simple2 = new Everything.TestSimpleBoxedB({
	some_int8: 42,
	nested_a: {
	    some_int: 43,
	    some_int8: 44,
	    some_double: 43.5
	}
    });
    assertEquals(42, simple2.some_int8);
    assertEquals(43, simple2.nested_a.some_int);
    assertEquals(44, simple2.nested_a.some_int8);
    assertEquals(43.5, simple2.nested_a.some_double);
}

function testBoxed() {
    let boxed = new Everything.TestBoxed();
    boxed.some_int8 = 42;
    assertEquals(42, boxed.some_int8);
}

gjstestRun();