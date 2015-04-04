'use strict';

module.exports = {

    /**
     * milesToMeters - converts a float representing miles to meters
     * @param miles
     * @returns {*}
     */
    milesToMeters: function (miles) {
        var multiplier = 1609.34;
        if (isNaN(miles)) {
            return null;
        }
        return miles * multiplier;
    },


    /**
     * metersToMiles - converts a float representing meters to miles
     * @param meters
     * @returns {*}
     */
    metersToMiles: function (meters) {
        var divider = 1609.34;
        if (isNaN(meters)) {
            return null;
        }
        return meters / divider;
    }

};
