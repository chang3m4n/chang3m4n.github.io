// Rainbow Brackets for PrismJS
// This script adds rainbow coloring to brackets based on their nesting level

(function () {
    if (typeof Prism === 'undefined') {
        return;
    }

    // Track bracket levels for each code block using a simple counter
    var levelCounter = 0;

    // Configure the rainbow brackets plugin
    Prism.hooks.add('before-highlight', function () {
        // Reset bracket level for each code block
        levelCounter = 0;
    });

    Prism.hooks.add('wrap', function (env) {
        if (env.type !== 'punctuation') {
            return;
        }

        var token = env.content;
        
        // Check if it's a bracket
        if (!/[{}[\]()<>]/.test(token)) {
            return;
        }

        // Determine if current token is opening or closing
        if (token === '(' || token === '{' || token === '[' || token === '<') {
            // It's an opening bracket, increment level
            levelCounter++;
            if (levelCounter > 6) levelCounter = 1;
        } else {
            // It's a closing bracket, use current level
            if (levelCounter === 0) levelCounter = 1;
        }
        
        // Add the level class
        var bracketType = '';
        if (token === '{' || token === '}') bracketType = 'brace';
        else if (token === '[' || token === ']') bracketType = 'bracket';
        else if (token === '(' || token === ')') bracketType = 'paren';
        else if (token === '<' || token === '>') bracketType = 'angle';
        
        env.classes.push(bracketType + '-level-' + levelCounter);
        
        // Update bracket level for closing brackets
        if (token === ')' || token === '}' || token === ']' || token === '>') {
            levelCounter--;
            if (levelCounter < 0) levelCounter = 0;
        }
    });
})();
