const { argv } = require('yargs');
const { writeFileSync } = require('fs');
const { join } = require('path');

const ssh = argv.ssh;
const wifiSsid = argv.wifiSsid || argv.ssid;
const wifiPass = argv.wifiPassword || argv.pass;
const location = argv.location || argv.l;
const showhelp = argv.h || argv.help || !location;
const wifiFile = `
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    scan_ssid=1
    ssid="${wifiSsid}"
    psk="${wifiPass}"
}
`;

if (showhelp) {
    console.log(`
        Raspberry PI Headless Setup.

        Enable ssh:   node rpi --location "E:" --ssh
        Enable wifi:  node rpi --location "E:" --ssid "My Wifi" --pass "My password"
        Enable both:  node rpi --location "E:" --ssh --ssid "My Wifi" --pass "My password"

        Assumes US country for Wifi.
    `);
}

if(ssh) {
    // write an SSH file. nothing special here.
    writeFileSync(join(location, '.ssh'), '');
    console.log(`wrote ssh file.`)
}
if (wifiSsid && wifiPass) {
    writeFileSync(join(location, 'wpa_supplicant.conf'), wifiFile);
    console.log(`wrote wifi file.`);
}