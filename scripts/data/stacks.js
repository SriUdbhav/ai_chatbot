/**
 * Stacks Module
 * Stack Using Arrays, Stack Overflow/Underflow, Infix to Postfix, Balanced Parentheses.
 */

module.exports = {
  title: 'Stacks Using Arrays',
  syllabus_code: 'DS-UNIT-4',
  stack_array: {
    name: 'Stack Using Arrays',
    type: 'data_structure',
    definition: 'A Stack is a linear data structure that operates under the LIFO (Last-In, First-Out) principle, where insertions and deletions occur strictly at a single designated end called the top.',
    working_principle: 'An integer index top tracks the most recently pushed element. When the stack is initialized, top = -1 (empty). Push increments top and places the new item at arr[top]. Pop retrieves arr[top] and decrements top. All operations take O(1) time.',
    step_by_step: '1. Push: check if top == MAX - 1 (Overflow). If not, top = top + 1; arr[top] = val.\n2. Pop: check if top == -1 (Underflow). If not, val = arr[top]; top = top - 1; return val.\n3. Peek: check if top == -1. If not, return arr[top].\n4. isEmpty: return top == -1.\n5. isFull: return top == MAX - 1.',
    example: 'Push 10 -> [10] (top=0). Push 20 -> [10, 20] (top=1). Pop -> returns 20, stack becomes [10] (top=0).',
    advantages: '• O(1) constant time for push, pop, and peek operations\n• Trivial implementation using static arrays\n• Ideal for backtracking, recursion call management, and syntax parsing',
    disadvantages: '• Fixed maximum size when implemented with static arrays (leads to Stack Overflow)\n• Cannot access arbitrary internal elements without popping top items',
    applications: '• Function call activation frames in CPU execution stacks\n• Undo / Redo mechanisms in software editors\n• Expression parsing (infix to postfix) and bracket syntax verification',
    time_complexity: '• Push: O(1)\n• Pop: O(1)\n• Peek: O(1)\n• Display: O(n)',
    space_complexity: 'O(MAX) static contiguous array storage.',
    conclusion: 'Stacks are fundamental in computing, governing function execution, memory stacks, and expression evaluation.',
    aim: 'Implement an Array-Based Stack in C supporting push, pop, peek, display, and overflow/underflow boundary protection.',
    algorithm: '1. Define MAX capacity and stack array with top = -1.\n2. push(val): if top == MAX-1 print overflow, else stack[++top] = val.\n3. pop(): if top == -1 print underflow, else return stack[top--].\n4. peek(): return stack[top].\n5. Test in main() with sample inputs.',
    c_program: `#include <stdio.h>
#include <stdbool.h>

#define MAX 5

int stack[MAX];
int top = -1;

bool isFull(void) {
    return top == MAX - 1;
}

bool isEmpty(void) {
    return top == -1;
}

void push(int val) {
    if (isFull()) {
        printf("Stack Overflow! Cannot push %d\\n", val);
        return;
    }
    stack[++top] = val;
    printf("Pushed: %d (top = %d)\\n", val, top);
}

int pop(void) {
    if (isEmpty()) {
        printf("Stack Underflow! Stack is empty\\n");
        return -1;
    }
    int val = stack[top--];
    return val;
}

int peek(void) {
    if (isEmpty()) {
        printf("Stack is empty!\\n");
        return -1;
    }
    return stack[top];
}

void display(void) {
    if (isEmpty()) {
        printf("Stack is empty\\n");
        return;
    }
    printf("Stack (Top to Bottom): ");
    for (int i = top; i >= 0; i--) {
        printf("%d ", stack[i]);
    }
    printf("\\n");
}

int main(void) {
    printf("--- Array-Based Stack in C ---\\n");
    push(10);
    push(20);
    push(30);
    display();

    printf("Peek: %d\\n", peek());
    printf("Popped: %d\\n", pop());
    display();
    return 0;
}`,
    important_statements: '• top = -1 signals that the stack is initially empty.\n• stack[++top] = val pre-increments top index before storing value.\n• stack[top--] reads current top value and post-decrements index.',
    sample_input: 'Push 10, 20, 30; Peek; Pop; Display',
    expected_output: `--- Array-Based Stack in C ---
Pushed: 10 (top = 0)
Pushed: 20 (top = 1)
Pushed: 30 (top = 2)
Stack (Top to Bottom): 30 20 10 
Peek: 30
Popped: 30
Stack (Top to Bottom): 20 10`,
    dry_run: `Initial: top = -1.
1. push(10): top becomes 0, stack[0] = 10.
2. push(20): top becomes 1, stack[1] = 20.
3. push(30): top becomes 2, stack[2] = 30.
4. peek(): returns stack[2] = 30.
5. pop(): reads stack[2] = 30, top becomes 1.
Stack remaining: 20, 10.`,
    viva_questions: [
      { q: 'What is the condition for Stack Overflow in an array-based stack?', a: 'top == MAX - 1, meaning all allocated array slots are occupied.' },
      { q: 'What is the condition for Stack Underflow?', a: 'top == -1, meaning no elements exist in the stack to pop or peek.' }
    ]
  },

  overflow_underflow: {
    name: 'Stack Overflow and Underflow',
    type: 'concept',
    definition: 'Stack Overflow and Stack Underflow are the two critical boundary failure states in stack data structure implementations.',
    working_principle: '• Stack Overflow occurs when an attempt is made to push an element onto a stack that has already reached its maximum allocated capacity (top == MAX - 1).\n• Stack Underflow occurs when an attempt is made to pop or peek an element from a stack that contains zero elements (top == -1).',
    step_by_step: '1. Overflow Detection: Evaluate if (top == MAX - 1) before performing push.\n2. Overflow Handling: Abort insertion, log error, or resize using dynamic memory.\n3. Underflow Detection: Evaluate if (top == -1) before performing pop or peek.\n4. Underflow Handling: Abort removal, return sentinel error value (e.g. -1 or INT_MIN).\n5. Both checks execute in O(1) constant time.',
    example: 'Capacity MAX = 3:\n• Push 10, 20, 30 -> top=2 (Full).\n• Push 40 -> Overflow error! Operation blocked.\n• Pop 30, 20, 10 -> top=-1 (Empty).\n• Pop -> Underflow error! Operation blocked.',
    advantages: '• Prevents memory corruption, array out-of-bounds writes, and segmentation faults\n• Ensures algorithmic correctness in parsers and recursive engines',
    disadvantages: '• Static stacks require predetermining MAX capacity, risking premature overflow\n• Dynamic stacks can still overflow if physical system RAM is exhausted',
    applications: '• CPU call stack overflow protection (detecting infinite recursion loops)\n• Compiler syntax parsing exception handling\n• JVM / CLR execution engine memory boundaries',
    time_complexity: 'O(1) condition checks.',
    space_complexity: 'O(1) state verification.',
    conclusion: 'Always guard push with an overflow check and pop with an underflow check in production code.',
    aim: 'Demonstrate Stack Overflow and Stack Underflow conditions and their prevention in C.',
    algorithm: '1. Set MAX = 3, top = -1.\n2. Push until full, then attempt extra push to trigger Overflow.\n3. Pop until empty, then attempt extra pop to trigger Underflow.\n4. Show boundary safety.',
    c_program: `#include <stdio.h>
#include <stdbool.h>

#define MAX 3

int stack[MAX];
int top = -1;

void push(int val) {
    // Boundary check for Stack Overflow
    if (top == MAX - 1) {
        printf("ALERT: Stack Overflow! Cannot push %d (top = %d, MAX = %d)\\n", val, top, MAX);
        return;
    }
    stack[++top] = val;
    printf("Pushed %d successfully (top = %d)\\n", val, top);
}

int pop(void) {
    // Boundary check for Stack Underflow
    if (top == -1) {
        printf("ALERT: Stack Underflow! Cannot pop (top = -1)\\n");
        return -1;
    }
    int val = stack[top--];
    printf("Popped %d successfully (top = %d)\\n", val, top);
    return val;
}

int main(void) {
    printf("=== Demonstrating Stack Overflow & Underflow ===\\n");
    // Trigger Overflow
    push(100);
    push(200);
    push(300);
    push(400); // Exceeds MAX=3 -> Overflow!

    // Trigger Underflow
    pop();
    pop();
    pop();
    pop(); // Empty -> Underflow!
    return 0;
}`,
    important_statements: '• if (top == MAX - 1) detects overflow before array out-of-bounds write occurs.\n• if (top == -1) detects underflow before negative index dereference occurs.',
    sample_input: 'Push 4 times on MAX=3; Pop 4 times',
    expected_output: `=== Demonstrating Stack Overflow & Underflow ===
Pushed 100 successfully (top = 0)
Pushed 200 successfully (top = 1)
Pushed 300 successfully (top = 2)
ALERT: Stack Overflow! Cannot push 400 (top = 2, MAX = 3)
Popped 300 successfully (top = 1)
Popped 200 successfully (top = 0)
Popped 100 successfully (top = -1)
ALERT: Stack Underflow! Cannot pop (top = -1)`,
    dry_run: `1. Push 100, 200, 300 fills slots 0, 1, 2. top reaches MAX - 1 = 2.
2. Push 400 evaluates top == MAX - 1 (2 == 2 is True) -> Prints Overflow alert and halts.
3. Pop 3 times empties stack. top reaches -1.
4. Fourth pop evaluates top == -1 (-1 == -1 is True) -> Prints Underflow alert and halts.`,
    viva_questions: [
      { q: 'What happens in C if an array stack pushes without an overflow check?', a: 'It writes beyond the array bounds into adjacent memory, causing buffer overflow vulnerabilities or crash segmentation faults.' },
      { q: 'How does dynamic memory eliminate the static Stack Overflow problem?', a: 'A linked-list stack allocates nodes dynamically on the heap on demand, overflowing only when system RAM is completely exhausted.' }
    ]
  },

  infix_to_postfix: {
    name: 'Infix to Postfix Conversion',
    type: 'algorithm',
    definition: 'Infix to Postfix Conversion transforms standard mathematical infix expressions (where operators sit between operands, e.g. A + B) into postfix Reverse Polish Notation (where operators follow operands, e.g. A B +) using a stack.',
    working_principle: 'Operands are immediately output. Operators are pushed onto a stack after popping all higher-or-equal precedence operators. Left parenthesis is pushed directly; right parenthesis pops and outputs all operators until matching left parenthesis is discarded.',
    step_by_step: '1. Scan expression from left to right.\n2. If operand (alphanumeric), append to output.\n3. If \'(\', push to stack.\n4. If \')\', pop and output until \'(\' is popped.\n5. If operator, pop higher or equal precedence operators, then push current operator.\n6. At end of expression, pop and output all remaining operators on stack.',
    example: 'Infix: A + B * C - D / E\nResult Postfix: A B C * + D E / -.',
    advantages: '• Eliminates ambiguity without parentheses\n• Direct linear O(n) evaluation by compilers and stack-based virtual machines\n• Follows strict operator precedence automatically',
    disadvantages: '• Unintuitive for human reading compared to standard algebraic infix notation',
    applications: '• Compiler code generation and syntax tree reduction\n• Reverse Polish Notation (RPN) scientific calculators\n• Virtual machine bytecode execution (e.g. JVM, Python bytecode)',
    time_complexity: 'O(n) linear scan through expression of length n.',
    space_complexity: 'O(n) auxiliary stack space for operators.',
    conclusion: 'Postfix notation allows computers to evaluate mathematical expressions in a single linear pass without backtracking.',
    aim: 'Implement Infix to Postfix conversion in C using an operator stack.',
    algorithm: '1. Define precedence(char): ^ -> 3, * / -> 2, + - -> 1, else 0.\n2. Iterate through string:\n   If operand: output.\n   If \'(\': push.\n   If \')\': pop to output until \'(\'.\n   If operator: pop >= precedence, push.\n3. Pop rest.',
    c_program: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) {
    if (top < MAX - 1) stack[++top] = c;
}

char pop(void) {
    if (top >= 0) return stack[top--];
    return '\\0';
}

char peek(void) {
    if (top >= 0) return stack[top];
    return '\\0';
}

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infixToPostfix(const char *infix, char *postfix) {
    int k = 0;
    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];
        if (isalnum(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            push(ch);
        } else if (ch == ')') {
            while (top >= 0 && peek() != '(') {
                postfix[k++] = pop();
            }
            pop(); // Remove '('
        } else {
            while (top >= 0 && precedence(peek()) >= precedence(ch)) {
                postfix[k++] = pop();
            }
            push(ch);
        }
    }
    while (top >= 0) {
        postfix[k++] = pop();
    }
    postfix[k] = '\\0';
}

int main(void) {
    const char *infix = "A+B*(C^D-E)";
    char postfix[MAX];

    infixToPostfix(infix, postfix);
    printf("Infix Expression:   %s\\n", infix);
    printf("Postfix Expression: %s\\n", postfix);
    return 0;
}`,
    important_statements: '• precedence(char op) assigns integer ranks to mathematical operators.\n• while (precedence(peek()) >= precedence(ch)) enforces operator precedence rules.\n• isalnum(ch) outputs operands directly to the postfix string.',
    sample_input: 'Infix: A+B*(C^D-E)',
    expected_output: `Infix Expression:   A+B*(C^D-E)
Postfix Expression: ABCD^E-*+`,
    dry_run: `Scanning A+B*(C^D-E):
1. A: Output "A"
2. +: Push '+' (stack: [+])
3. B: Output "AB"
4. *: Push '*' (stack: [+, *])
5. (: Push '(' (stack: [+, *, (])
6. C: Output "ABC"
7. ^: Push '^' (stack: [+, *, (, ^])
8. D: Output "ABCD"
9. -: Pop '^' (stack: [+, *, (, -]), Output "ABCD^"
10. E: Output "ABCD^E"
11. ): Pop '-' to output, discard '(' -> Output "ABCD^E-"
12. End: Pop '*' and '+' -> Final: "ABCD^E-*+".`,
    viva_questions: [
      { q: 'Why is postfix notation preferred over infix in computer compilers?', a: 'Postfix eliminates parentheses and operator precedence ambiguities, allowing linear O(n) left-to-right evaluation using a single operand stack.' }
    ]
  },

  parentheses_matching: {
    name: 'Balanced Parentheses Checking',
    type: 'algorithm',
    definition: 'Balanced Parentheses Checking verifies whether opening brackets in a mathematical or code string match their corresponding closing brackets in proper nested order using a stack.',
    working_principle: 'Whenever an opening bracket ((, {, [) is encountered, it is pushed onto the stack. When a closing bracket (), }, ]) appears, the top element is popped and verified to match. If stack is empty on closing bracket or types mismatch, expression is unbalanced. If stack is empty at string end, it is balanced.',
    step_by_step: '1. Initialize character stack with top = -1.\n2. Scan string left to right.\n3. If opening bracket, push to stack.\n4. If closing bracket:\n   a. If stack is empty -> Return False (Unbalanced).\n   b. Pop top and check if it matches current closing bracket. If not -> Return False.\n5. When scan finishes, return (top == -1) (Balanced if empty).',
    example: '• Balanced: {[()]} -> Pushes {, [, (, pops and matches each correctly.\n• Unbalanced: ({[)]} -> ( popped against ] triggers mismatch.',
    advantages: '• Accurate linear O(n) syntax validation\n• Minimal memory usage proportional to nesting depth',
    disadvantages: '• Stack can grow to O(n) on deeply nested code files',
    applications: '• Compiler syntax parsing (C, Java, Python IDE syntax checkers)\n• HTML / XML tag validation engines\n• Mathematical equation parsers in symbolic math software',
    time_complexity: 'O(n) single pass through string of length n.',
    space_complexity: 'O(n) auxiliary stack space.',
    conclusion: 'Balanced parentheses checking is the canonical algorithm used by IDEs to catch syntax errors before compilation.',
    aim: 'Implement Balanced Parentheses Checking in C using a character stack.',
    algorithm: '1. Scan string.\n2. Push opening brackets.\n3. On closing bracket, pop and verify pair match.\n4. Check stack is empty at end.',
    c_program: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX 100

bool isMatchingPair(char open, char close) {
    if (open == '(' && close == ')') return true;
    if (open == '{' && close == '}') return true;
    if (open == '[' && close == ']') return true;
    return false;
}

bool isBalanced(const char *expr) {
    char stack[MAX];
    int top = -1;

    for (int i = 0; expr[i] != '\\0'; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            if (top >= MAX - 1) return false;
            stack[++top] = ch;
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (top == -1) return false; // Underflow: closing bracket without opening
            char open = stack[top--];
            if (!isMatchingPair(open, ch)) return false; // Mismatched brackets
        }
    }
    return (top == -1); // True if all opening brackets were matched
}

int main(void) {
    const char *expr1 = "{[()]}";
    const char *expr2 = "{[(])}";

    printf("Expression: %s -> %s\\n", expr1, isBalanced(expr1) ? "BALANCED" : "UNBALANCED");
    printf("Expression: %s -> %s\\n", expr2, isBalanced(expr2) ? "BALANCED" : "UNBALANCED");
    return 0;
}`,
    important_statements: '• isMatchingPair checks matching bracket types: (), {}, [].\n• if (top == -1) handles premature closing bracket error.\n• return (top == -1) verifies no unclosed opening brackets remain.',
    sample_input: 'Expressions: "{[()]}" and "{[(])}"',
    expected_output: `Expression: {[()]} -> BALANCED
Expression: {[(])} -> UNBALANCED`,
    dry_run: `Evaluating sample bracket sequence:
1. Open brace '{' pushed to stack (paired with '}').
2. Open bracket '[' pushed to stack (paired with ']').
3. Open parenthesis '(' pushed to stack (paired with ')').
4. Closing ')' matches '(' on top of stack and pops.
5. Closing ']' matches '[' on top of stack and pops.
6. Closing brace '{' matches '}' on top of stack and pops.
End of string: top == -1 (All brackets matched and stack is empty -> BALANCED).`,
    viva_questions: [
      { q: 'Why is a stack used for bracket matching instead of a queue?', a: 'Because brackets follow a Last-In, First-Out nesting rule: the most recently opened bracket must be the first one to be closed.' }
    ]
  }
};
