import { createButton, createRadioButton, createSnack, createTextArea } from '../js/utils/ComponentUtils.js'
import { getQuestions } from '../js/utils/LocalStorageUtils.js'
import { getMatchedQuestion } from '../js/utils/CommonUtils.js'

(function () {
    'use strict';

    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */

    function it (desc, fn) {
        try {
            fn();
            console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
        } catch (error) {
            console.log('\n');
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
            console.error(error);
        }
    }

    function assert (isTrue) {
        if (!isTrue) {
            throw new Error();
        }
    }

    function assertObject (array) {
        console.log('array', array, array.length)
        if (!typeof array !== 'undefined' && !array.length > 0) {
            throw new Error();
        }
    }

    function assertQuestionMatch (questions) {
        if (!questions) {
            throw new Error();
        } else {
            it('checking for matching question', function () {
                // testing against fake question obj
                const questionObj = {
                    question: 'How do you rate the delivery experience?'
                }
                // for failure case
                /* const errorQuestionObj = {
                    question: 'Can we get more fruits on discount?' 
                } */

                assertObject(getMatchedQuestion(questionObj))
                // assertObject(getMatchedQuestion(errorQuestionObj)) - uncomment to test failure case 
            })
        }
    }

    // function to test button component
    it('create a button component in dom', function () {
        assert(createButton());
    });

    // function to test textArea component
    it('creating a TextArea component in dom', function () {
        assert(createTextArea());
    });

    // function to test radio button component
    it('create a radio button component in dom', function () {
        assert(createRadioButton());
    });

    // function to test snackbar component
    it('create a snackbar button component in dom', function () {
        assert(createSnack('Submitted Successfully!', 'success'));
    });

    // testing method that matching questions with a question obj
    it('getting all questions from localstoarge & finding matched question', function () {
        assertQuestionMatch(getQuestions())
    })
})();
