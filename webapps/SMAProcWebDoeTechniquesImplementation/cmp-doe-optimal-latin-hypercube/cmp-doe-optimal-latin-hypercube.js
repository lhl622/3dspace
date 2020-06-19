/**
 * @class element:cmp-doe-optimal-latin-hypercube
 * @noinstancector
 * @description
 * This component implements the Optimal Latin Hypercube technique in DOE.
 * The Optimal Latin Hypercube technique is a modified Latin Hypercube where
 * the combination of factor levels for each factor is optimized, rather than randomly combined.
 */

require(['SMAProcWebDoeTechniquesBase/SMAProcDesignDriverFactorImpl'],
function(SMAProcDesignDriverFactorImpl){
    'use strict';
    window.Polymer(/** @lends element:cmp-doe-optimal-latin-hypercube# */{
        is: 'cmp-doe-optimal-latin-hypercube',

        properties: /** @lends element:cmp-doe-optimal-latin-hypercube# */{

            /**
             * Properties/options specific to the technique - Latin Hypercube.
             * The number of levels in Fractional Factorial technique can be only 2 or 3.
             * @type {Object}
             */
            techniqueOptions: {
                type: Object,
                value: function () {
                    return {
                        'numberOfPoints': 1,
                        'randomSeed': 2,
                        'isSeedEnabled': false,
                        'maxTime': 5.0
                    };
                }
            },

            /**
             * Keys of the columns to be rendered for the factors table
             * @type {Array}
             */
            factorColumns: {
                type: Array,
                notify: true,
                value: ['Lower', 'Upper', 'Relation', 'Baseline', 'Values']
            },

            /**
             * Names of the properties to be saved in the definition
             * @type {Array}
             */
            factorAttributes: {
                type: Array,
                notify: true,
                value: ['Lower', 'Upper', 'Relation', 'Baseline']
            },

            /**
             * The default values of the attributes for each factor
             * @type {Object}
             */
            factorAtrributeDefaultValues: {
                type: Object,
                value: {
                    Lower: '-10',
                    Upper: '10',
                    Levels: '-10 10',
                    Relation: 'diff',
                    Baseline: '0.0',
                    Values: ''
                }
            },

            /**
             * The factors are added/updated in this array as and when they are selected/updated by the user
             * @type {Array}
             */
            updatedFactors: {
                type: Array,
                notify: true,
                value: function() { return []; }
            }
        },

        /**
         * Called after the element is attached to the document. Can be called multiple times during the lifetime of an element.
         * The first `attached` callback is guaranteed not to fire until after `ready`.
         */
        attached:function(){
            var that = this;
            this.async(function(){
                that.fire('techniqueloaded', that);
            });
        },

        /**
         * It is called from the Apply() method of cmp-doe, it sets the technique options in the plugin configuration.
         * @param {module:DS/JSCMM/SMAJSCMMExtensionConfig.SMAJSCMMExtensionConfig} pluginExtensionConfig - selected plugin configuration
         */
        Apply: function (pluginExtensionConfig) {
            console.log('In Apply() of cmp-doe-optimal-latin-hypercube..');
            // Set descriptor values with attribute settings
            if (null === pluginExtensionConfig) {
                return ;
            }
            if (pluginExtensionConfig.getPropertyByName('Technique Options')) {
                var properties = pluginExtensionConfig.getPropertyByName('Technique Options').getProperties();
                for (var i = 0; i < properties.length; i++){
                    switch (properties[i].getName()) {
                    case '# Points':
                        properties[i].setValue((this.techniqueOptions.numberOfPoints < this.updatedFactors.length+1) ? this.updatedFactors.length+1 : this.techniqueOptions.numberOfPoints);
                        if (this.techniqueOptions.Expression && this.techniqueOptions.Expression.numberOfPoints) {
                            properties[i].setExpression(this.techniqueOptions.Expression.numberOfPoints);
                        }
                        break;
                    case 'Fixed Seed':
                        properties[i].setValue(this.techniqueOptions.isSeedEnabled);
                        break;
                    case 'Random Seed':
                        properties[i].setValue(this.techniqueOptions.randomSeed);
                        break;
                    case 'Maximum Time':
                        properties[i].setValue(this.techniqueOptions.maxTime);
                        break;
                    }
                }
            }
        },

        /**
         * Revisits each of the and its attributes and re-populates/re-calculates any missing attribute for the factors
         * @param {Array} factors - An array of factors containing the attributes
         */
        reviseFactorAttributes: function(factors) {
            for (var i = 0; i < factors.length; i++) {
                var revisedFactor = {};
                var levels = [];
                if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                {
                    if (factors[i]['Levels'].split)
                        { levels = factors[i]['Levels'].split(' ').filter(SMAProcDesignDriverFactorImpl.hasEmptyValues); }
                }
                revisedFactor['Name'] = factors[i]['Name'];
                for (var j = 0; j < this.factorAttributes.length; j++){
                    switch (this.factorAttributes[j])
                    {
                        case 'Lower':
                            if ((factors[i]['Lower'] !== undefined) && (factors[i]['Lower'] !== ''))
                            {
                                revisedFactor['Lower'] = factors[i]['Lower'];
                            }
                            else if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                            {
                                revisedFactor['Lower'] = levels[0];
                            }
                            else
                            {
                                revisedFactor['Lower'] = this.factorAtrributeDefaultValues['Lower'];
                            }
                        break;

                        case 'Upper':
                            if ((factors[i]['Upper'] !== undefined) && (factors[i]['Upper'] !== ''))
                            {
                                revisedFactor['Upper'] = factors[i]['Upper'];
                            }
                            else if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                            {
                                revisedFactor['Upper'] = levels[levels.length - 1];
                            }
                            else
                            {
                                revisedFactor['Upper'] = this.factorAtrributeDefaultValues['Upper'];
                            }
                        break;

                        case 'Relation':
                            if ((factors[i]['Relation'] !== undefined) && (factors[i]['Relation'] !== ''))
                            {
                                revisedFactor['Relation'] = factors[i]['Relation'];
                            }
                            else
                            {
                                revisedFactor['Relation'] = this.factorAtrributeDefaultValues['Relation'];
                            }
                        break;

                        case 'Baseline':
                            if ((factors[i]['Baseline'] !== undefined) && (factors[i]['Baseline'] !== ''))
                            {
                                revisedFactor['Baseline'] = factors[i]['Baseline'];
                            }
                            else
                            {
                                revisedFactor['Baseline'] = this.factorAtrributeDefaultValues['Baseline'];
                            }
                        break;
                    }
                }
                this.push('updatedFactors', revisedFactor);
            }
            if (this.techniqueOptions.numberOfPoints <= this.updatedFactors.length+1) {
                this.set('techniqueOptions.numberOfPoints', this.updatedFactors.length+1);
            }
            return this.updatedFactors;
        },

        /**
         * Populates the default values in the table for the factors on parameter selection,
         * also update the data structure for the parameters updatedFactors
         * @param {Object} cellinfo - The corresponding cell information of the selected factor to be updated
         * @param {String} paramName - Name of the parameter
         */
        populateDefaults: function(cellinfo, paramName) {

            if (this.techniqueOptions.numberOfPoints <= this.updatedFactors.length+1) {
                this.set('techniqueOptions.numberOfPoints', this.techniqueOptions.numberOfPoints+1);
            }

            if (SMAProcDesignDriverFactorImpl.findFactor(paramName, this.updatedFactors) < 0) {
                var factor = {
                        Name: paramName
                };
                for (var j = 0; j < this.factorAttributes.length; j++){
                    factor[this.factorAttributes[j]] = this.factorAtrributeDefaultValues[this.factorAttributes[j]];
                    if (this.factorAttributes[j] === 'Baseline' && (cellinfo.paraminfo && cellinfo.paraminfo.value !== null && cellinfo.paraminfo.value !== undefined)) {
                        factor[this.factorAttributes[j]] = cellinfo.paraminfo.value;
                    }
                }
                if (parseFloat(factor['Baseline']) !== 0) {
                    factor['Relation'] = '%';
                }
                factor['cellinfo'] = cellinfo;
                this.push('updatedFactors', factor);
            }

            var length = this.updatedFactors.length;
            for (var i=0; i<length; i++) {
                this.populateFactorRow(this.updatedFactors[i]);
            }

            return this.updatedFactors;
        },


        /**
         * Populates the cells in the factors table for the given factor.
         * @param {Object} factor - The factor that is to be updated based on its other attributes
         */
        populateFactorRow: function(factor) {
            var cellinfo = factor.cellinfo;
            cellinfo.DOMrow.cells[3].getElementsByClassName('textInp')[0].value = factor.Lower;
            cellinfo.DOMrow.cells[3].getElementsByClassName('textInp')[0].title = factor.Lower;
            cellinfo.DOMrow.cells[4].getElementsByClassName('textInp')[0].value = factor.Upper;
            cellinfo.DOMrow.cells[4].getElementsByClassName('textInp')[0].title = factor.Upper;
            cellinfo.DOMrow.cells[6].getElementsByTagName('select')[0].disabled = false;
            cellinfo.DOMrow.cells[6].children[0].selectedIndex = SMAProcDesignDriverFactorImpl.factorRelationOptions.value.indexOf(factor.Relation);
            cellinfo.DOMrow.cells[6].children[0].title = factor.Relation;
            cellinfo.DOMrow.cells[7].getElementsByClassName('textInp')[0].value = factor.Baseline;
            cellinfo.DOMrow.cells[7].getElementsByClassName('textInp')[0].title = factor.Baseline;
            this.populateFactorValues(factor);

        },

        /**
         * Updates the values column in the Factors tab of DOE.
         * Once the parameter/factor is selected, the values of the factor are calculated based on
         * the default values of the other attributes as defined in factorAttributes.
         * If the factor is updated then the values are recalculated.
         * @param {Object} factor - The factor that is to be updated based on its other attributes
         */
        populateFactorValues: function(factor) {
            var cellinfo = factor.cellinfo;

            var numberOfPoints = this.techniqueOptions.numberOfPoints;
            var factorsLengthPlusOne = this.updatedFactors.length + 1;
            var levels = SMAProcDesignDriverFactorImpl.getDistribution(
                factor.Lower,
                factor.Upper,
                (numberOfPoints < factorsLengthPlusOne) ? factorsLengthPlusOne : numberOfPoints
            );

            var values = SMAProcDesignDriverFactorImpl.getValues(levels, factor.Baseline, factor.Relation);

            cellinfo.DOMrow.cells[9].textContent = values;
            cellinfo.DOMrow.cells[9].title = values;
        },

        /**
         * It updates the factor information when the user edits any of the columns in the factors table.
         * @param {Object} cellinfo - The cell information that has the column name and the value that was updated.
         * @param {String} paramName - Name of the parameter that was updated
         */
        updateFactorInfo: function (cellinfo, paramName) {
            var index = SMAProcDesignDriverFactorImpl.findFactor(paramName, this.updatedFactors);
            this.updatedFactors[index][cellinfo.colName];
            if (this.updatedFactors[index][cellinfo.colName]) {
                this.updatedFactors[index][cellinfo.colName] = cellinfo.value;
                this.populateFactorRow(this.updatedFactors[index]);
            }
        },

        /**
         * Updates the technique options as retrieved from the properties while updating UI in parent element cmp-doe
         * @param {Array} properties - An array of technique options or [SMAJSCMMProperty]{@link module:DS/JSCMM/SMAJSCMMProperty.SMAJSCMMProperty} objects
         */
        updateTechniqueOptions: function (properties) {
            for (var i = 0; i < properties.length; i++) {
                switch (properties[i].getName()) {
                case '# Points':
                    this.set('techniqueOptions.numberOfPoints', (properties[i].getValue() < this.updatedFactors.length+1) ? this.updatedFactors.length+1 : properties[i].getValue());
                    if (properties[i].getExpression()) {
                        this.$.points.readonly = true;
                        this.$.points.readonly = true;
                        this.techniqueOptions.Expression = {};
                        this.techniqueOptions.Expression.numberOfPoints = properties[i].getExpression();
                    }
                    break;
                case 'Fixed Seed':
                    this.set('techniqueOptions.isSeedEnabled', properties[i].getValue());
                    break;
                case 'Random Seed':
                    this.set('techniqueOptions.randomSeed', properties[i].getValue());
                    break;
                case 'Maximum Time':
                    this.set('techniqueOptions.maxTime', properties[i].getValue());
                    break;
                }
            }
        },

        /**
         * Updates the number of points/factors for this technique, for which the values are recalculated
         * @param {Object} event - The event triggered on editing the number of points field in the UI
         */
        _numOfPointsUpdated: function(event) {
            if (this.updatedFactors && (event.srcElement.value > this.updatedFactors.length+1)) {
                for (var i=0; i<this.updatedFactors.length; i++) {
                    this.populateFactorRow(this.updatedFactors[i]);
                }
            }
        }
    });
});
