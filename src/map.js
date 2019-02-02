const AccessKey = `HP3fVDj7ImYVcFVMP8Own`;
const SecretKey = `RKxmipYJMMJncwClnx2PGL1AqjrXbtqjcmrRDdxY`;

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const Weather = new AerisWeather(AccessKey, SecretKey);
        const control = document.getElementById('map-toggle-anim');

        Weather.views().then((views) => {
            const map = new views.InteractiveMap('#ia-map', {
                strategy: 'google',
                center: {
                    lat: 39.0,
                    lon: -95.5
                },
                zoom: 4,
                layers: 'alerts,radar',
                timeline: {
                    from: -6 * 3600,
                    to: 23 * 3600
                }
            }, (_Map_) => {
                _Map_.addLayers(['water-depth', 'tropical-cyclones']);
            });
            map.on('load', () => {
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
    });

})();