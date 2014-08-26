define([
    // components
    './_filter_rooms',
    './_filter_tags',
    './_filter_types'
], function (
    // components
    FilterRoomsClass,
    FilterTagsClass,
    FilterTypesClass
    ) {
    'use strict';

    return function (Ctx, _options) {
        var that = this,
            options = _options || {};

        return Ctx.createClass({
            setPrimaryFilter: function (filter) {
                var state = this.getState();
                this.getState().set('primaryFilter', filter);
                if (filter === 'rooms') {
                    state.set('secondaryFilter', state.sub('locations').val().get(0).get('id'));
                } else if (filter === 'tags') {
                    state.set('secondaryFilter', state.val('deviceTags')[0]);
                } else if (filter === 'types') {
                    state.set('secondaryFilter', state.val('deviceTypes')[0]);
                } else {
                    state.set('secondaryFilter', '');
                }
                return false;
            },
            render: function () {
                var state = this.getState(),
                    _ = Ctx.React.DOM,
                    SecondaryFilters,
                    FilterRooms = new FilterRoomsClass(Ctx),
                    FilterTags = new FilterTagsClass(Ctx),
                    FilterTypes = new FilterTypesClass(Ctx),
                    primaryFilter = state.val('primaryFilter');

                SecondaryFilters = function () {
                    if (primaryFilter === 'rooms') {
                        return FilterRooms({state: state});
                    } else if (primaryFilter === 'types') {
                        return FilterTypes({state: state});
                    } else if (primaryFilter === 'tags') {
                        return FilterTags({state: state});
                    } else {
                        return null;
                    }
                };

                return _.div({className: 'filters-container clearfix'},
                    _.div({className: 'header-sub-container main-filter-container clearfix'},
                        _.div({className: 'primary-filters'},
                            _.span({onClick: this.setPrimaryFilter.bind(null, 'all'), className: primaryFilter === 'all' ? 'primary-filter selected' : 'primary-filter'}, 'All'),
                            _.span({onClick: this.setPrimaryFilter.bind(null, 'rooms'), className: primaryFilter === 'rooms' ? 'primary-filter selected' : 'primary-filter'}, 'Rooms'),
                            _.span({onClick: this.setPrimaryFilter.bind(null, 'types'), className: primaryFilter === 'types' ? 'primary-filter selected' : 'primary-filter'}, 'Types'),
                            _.span({onClick: this.setPrimaryFilter.bind(null, 'tags'), className: primaryFilter === 'tags' ? 'primary-filter selected' : 'primary-filter'}, 'Tags')
                        )
                    ),
                    SecondaryFilters()
                )
            }
        });
    }
});
