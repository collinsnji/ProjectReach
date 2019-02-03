window.onload = () => {
    const AccessKey = `PR4WiuLMV4BI3GXsX1O30`;
    const SecretKey = `bhL724IGOp07NlZ10c8adLuoAViPkN0Uu5eAwmvp`;
    const CharityAPIKey = `1426fc2d2e6b242fc2911ccbea6fce4b`;

    const Weather = new AerisWeather(AccessKey, SecretKey);
    const control = document.getElementById('map-toggle-anim');

    if ('geolocation' in navigator) {
        let position = {};
        position.lat = 41.8781;
        position.lon = -87.6298;
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
                fetch(`https://data.orghunter.com/v1/charitysearch?user_key=${CharityAPIKey}`, {
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                        // "Content-Type": "application/x-www-form-urlencoded",
                    }
                }).then(results => results.json()).then(data => {
                    data.data.forEach(charity => {

                        let coords = {
                            lat: charity.latitude,
                            lon: charity.longitude
                        };
                        let missionStatement = ((charity.missionStatement) ? charity.missionStatement : 'No mission statement provided');
                        let contentString =
                            `
                            <p><b>${charity.charityName}</b></p>
                            <p>${missionStatement}</p>
                            <p><a href='${charity.url}' _target='blank'>${charity.url}</a></p>
                            <p><b><a href='${charity.donationUrl}' _target='blank'>Donate</a></b></p>
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
                    control.innerHTML = 'Stop Animations';
                });
                map.on('timeline:stop', () => {
                    control.innerHTML = 'Animate Weather Pattern';
                });
                control.addEventListener('click', function (e) {
                    e.preventDefault();
                    map.timeline.toggle();
                });
            });

        });
    }
}
