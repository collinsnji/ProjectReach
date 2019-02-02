const AccessKey = `bjGy3wInH5mquxYZoUYZB`;
const SecretKey = `SfYfmyTbb3lR5NyUNHdHjDNIsCfKkqWLPDPtml3r`;

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const Weather = new AerisWeather(AccessKey, SecretKey);
        const control = document.getElementById('map-toggle-anim');
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                let position = {};
                position.lat = pos.coords.latitude || 38.5816;
                position.lon = pos.coords.longitude || -121.4944;
                Weather.views().then((views) => {
                    const map = new views.InteractiveMap('#ia-map', {
                        strategy: 'google',
                        center: {
                            lat: position.lat,
                            lon: position.lon
                        },
                        zoom: 6,
                        layers: 'alerts,radar,earthquakes,stormcells',
                        controls: {
                            layers: [{
                                title: 'Radar',
                                value: 'radar'
                            }, {
                                title: 'Satellite',
                                value: 'satellite'
                            }, {
                                title: 'Alerts',
                                value: 'alerts'
                            }, {
                                title: 'Temps',
                                value: 'temperatures,water-flat'
                            }]
                        },
                        timeline: {
                            from: -6 * 3600,
                            to: 23 * 3600
                        }
                    }, (_Map_) => {
                        // _Map_.addLayers(['water-depth', 'tropical-cyclones']);
                        _Map_.addLayer('temperatures,water-flat:blend(dst-out)', {
                            style: {
                                opacity: 0.4,
                                blur: 2
                            }
                        });
                        _Map_.addLayer('stormreports', {
                            style: {
                                svg: {
                                    shape: {
                                        type: 'rect',
                                        fill: {
                                            color: '#7101df'
                                        },
                                        stroke: {
                                            color: '#ffffff',
                                            width: 2
                                        }
                                    }
                                },
                                size: [14, 14]
                            }
                        });
                        _Map_.addLayer('stormcells', {
                            request: {
                                parameters: {
                                    filter: 'tornado'
                                }
                            }
                        });
                    });
                    map.on('load', () => {
                        window.GoogleMap = map.strategy.map;
                        map.on('timeline:play', () => {
                            control.innerHTML = 'Stop';
                        });
                        map.on('timeline:stop', () => {
                            control.innerHTML = 'Play';
                        });
                        control.addEventListener('click', function (e) {
                            e.preventDefault();
                            map.timeline.toggle();
                        });
                    });
                    var _map;
                    function initMap() {
                        _map = window.GoogleMap;
                        console.log(_map);
                        // Create a <script> tag and set the USGS URL as the source.
                        var script = document.createElement('script');
                        // This example uses a local copy of the GeoJSON stored at
                        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
                        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }

                    // Loop through the results array and place a marker for each
                    // set of coordinates.
                    window.eqfeed_callback = function (results) {
                        for (var i = 0; i < results.features.length; i++) {
                            var coords = results.features[i].geometry.coordinates;
                            var latLng = new google.maps.LatLng(coords[1], coords[0]);
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: _map
                            });
                        }
                    }
                    window.initMap = initMap;
                });
            });
        }
    });
})();