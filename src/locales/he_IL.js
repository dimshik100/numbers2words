/**
 * he_IL locale
 * @constructor
 */
T2W.HE_IL = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.HE_IL.DICTIONARY = {
	zero		:"אפס",
	ones		:[ "", "אחת", "שתיים", "שלוש", "ארבע", "חמיש", "שיש", "שבע", "שמונה", "תשע" ],
	teens		:[ "ten", "אחת - עשרה", "שתיים - עשרה", "שלוש - עשרה", "ארבע - עשרה", "חמיש - עשרה", "שיש - עשרה", "שבע - עשרה", "שמונה - עשרה", "תשע - עשרה" ],
	tens		:[ "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety" ],
	hundred		:"hundred",
	radix		:["", "thousand", "million"],
	delimiters	:["-", "and"]
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.HE_IL.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.HE_IL.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.HE_IL.prototype.translate = function( numbers ) {	
	
	// Check max value	
	if(numbers.length * T2W.HE_IL.TOKEN_LENGTH > T2W.HE_IL.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.HE_IL.MAX_NUMBERS + ")."		
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.HE_IL.DICTIONARY.zero;
	}
	
	var words = [];
	for(var idx = 0, max = numbers.length; idx < max; idx++){				
		words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx, max));	
	}
	
	return words.join("");								
};

/**
 * Converts first three numbers to words.
 * @private
 * It solves exceptions in the English language.
 * @param {Array} numbers
 * @param {number} index
 * @param {number} max - length of tokens
 * @return {string}
 */
T2W.HE_IL.prototype._getTrio = function( numbers, index, max){																				
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix(numbers, index);
	
	if(numbers[T2W.HUNDRED_INDEX]){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.HE_IL.DICTIONARY.hundred + ' ' + T2W.HE_IL.DICTIONARY.delimiters[1] + ' '
			: this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.HE_IL.DICTIONARY.hundred;
	}
	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = numbers[T2W.SINGLE_INDEX] 
			? this._getTens( numbers[T2W.TEN_INDEX]) + T2W.HE_IL.DICTIONARY.delimiters[0] + this._getOnes( numbers[T2W.SINGLE_INDEX]) 
			: this._getTens( numbers[T2W.TEN_INDEX]); 	
	}
							
	if( !numbers[ T2W.TEN_INDEX ] ){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}
				
	if(index+1 < max && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]) ){
		hundred = ' ' + hundred;
	}
	
	if( index === 0 && index+1 < max && !numbers[ T2W.HUNDRED_INDEX ] && (numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] )){
		hundred	 = ' ' + T2W.HE_IL.DICTIONARY.delimiters[1] + ' ';		
	}
								
	return hundred + ten + single + radix;		
};

/**
 * Get ones
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @param {number} index
 * @return {string}
 */
T2W.HE_IL.prototype._getOnes = function( number) {			
	return T2W.HE_IL.DICTIONARY.ones[ number ];			
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.HE_IL.prototype._getTens = function( number ) {		
	return T2W.HE_IL.DICTIONARY.tens[ number ];				
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.HE_IL.prototype._getTeens = function(number ){
	return T2W.HE_IL.DICTIONARY.teens[ number ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.HE_IL.prototype._getRadix = function( numbers, index ) {		
	var radix = '';
	if( index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX])){	
		radix = ' ' + T2W.HE_IL.DICTIONARY.radix[ index ];			
	}
			
	return radix;
};
