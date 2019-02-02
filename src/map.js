if ('geolocation' in navigator) {

}
window.onload = () => {
    const AccessKey = `QrTSamfllAQyzsdB8kLrl`;
    const SecretKey = `ZpJks6qFwgDL1DKJ3Znj5aOADS2iSKec4z4Xza74`;
    const CharityAPIKey = `1426fc2d2e6b242fc2911ccbea6fce4b`;

    const Weather = new AerisWeather(AccessKey, SecretKey);
    const control = document.getElementById('map-toggle-anim');
    if ('geolocation' in navigator) {
        let position = {};
        position.lat = 38.5816;
        position.lon = -121.4944;
        Weather.views().then((views) => {
            const map = new views.InteractiveMap('#ia-map', {
                strategy: 'google',
                center: {
                    lat: position.lat,
                    lon: position.lon
                },
                zoom: 6,
                layers: 'alerts,radar,earthquakes,stormcells',
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
                                type: 'circle',
                                fill: {
                                    color: '#7101df'
                                },
                                stroke: {
                                    color: '#ffffff',
                                    width: 2
                                }
                            }
                        },
                        size: [15, 15]
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
                console.log(window.GoogleMap);
                fetch(`http://data.orghunter.com/v1/charitysearch?user_key=${CharityAPIKey}`).then(results => results.json()).then(data => {
                    data.data.forEach(charity => {
                        let coords = {
                            lat: charity.latitude,
                            lon: charity.longitude
                        };
                        let contentString =
                            `
                            <p><b>${charity.charityName}</b></p>
                            <a href='${charity.url}'>Home Page</a>
                            `;
                        let latLng = new google.maps.LatLng(coords.lat, coords.lon);
                        let marker = new google.maps.Marker({
                            map: window.GoogleMap,
                            position: latLng,
                            animation: google.maps.Animation.DROP,
                            title: charity.charityName
                        });
                        let infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        marker.addListener('click', function () {
                            infowindow.open(map, marker);
                        });
                    });
                }).catch(err => {
                    throw new Error(err);
                })
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

        });
    }
}
