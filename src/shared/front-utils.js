function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}
const get6DigitOfAccount = (account) => {
  if (!account) return "";
  return account.substr(0, 5) + "..." + account.substr(account.length - 4);
};
const get6DigitOfDid = (did) => {
  if (!did) return "";
  return did.substr(0, 9) + "..." + did.substr(did.length - 4);
};

function CopyMe(TextToCopy) {
  var TempText = document.createElement("input");
  TempText.value = TextToCopy;
  document.body.appendChild(TempText);
  TempText.select();

  document.execCommand("copy");
  document.body.removeChild(TempText);
}

function sumText(_text) {
  if (!_text) {
    return 1;
  }
  const text = _text.toLowerCase();
  let total = 0;
  for (var i = 0; i < text.length; i++) {
    const s = text.charCodeAt(i);
    total += s;
  }
  return total;
}

function getIconIndexByAddress(_text) {
  const total = sumText(_text);
  return (total % 24) + 1;
}

function getRandomAvatarNumber() {
  return Math.floor(Math.random() * (24 - 1) + 1);
}

function getGradientBackgroundByAddress(address) {
  const gradients = [
    "linear-gradient(182.18deg, #FF7CAE -9.48%, #FF7CAE -9.48%, #FE332B 124.49%)",
    "linear-gradient(198.01deg, #00BF57 0.44%, #005F91 108.3%)",
    "linear-gradient(190.15deg, #5E3BD5 -23.27%, #F4E7FD 128.78%)",
    "linear-gradient(178.77deg, #909FE1 -9.02%, #FDCFEC 117.37%)",
    "linear-gradient(178.77deg, #E5ACF3 -27.61%, #6A86E9 128.58%)",
    "linear-gradient(178.77deg, #0050D5 -27.61%, #8E9FE4 128.58%)",
  ];
  const total = sumText(address);
  const index = total % gradients.length;
  return gradients[index];
}

function isMobileOrTablet() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function getBackgroundCollorByText(text) {
  const colors = [
    "#CCF696",
    "#EBFF71",
    "#71FF98",
    "#71F6FF",
    "#D987FF",
    "#FF87A4",
    "#FFCF87",
    "#FF8787",
    "#FF87EC",
    "#87FFE2",
  ];
  if (!text) {
    return colors[0];
  }
  let total = 0;
  for (var i = 0; i < text.length; i++) {
    const s = text.charCodeAt(i);
    total += s;
  }
  return colors[total % colors.length];
}
function isEmptyString(str) {
  return !str || str.length === 0;
}
function isValidateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function resolveIPFSLink(ipfsLink) {
  if (!ipfsLink) {
    return;
  }
  const splitted = ipfsLink.split("://");
  if (splitted[0] === "https") {
    return ipfsLink;
  }
  return `https://ipfs.io/ipfs/${splitted[1]}`;
}

const exports = {
  round,
  get6DigitOfAccount,
  CopyMe,
  getIconIndexByAddress,
  isMobileOrTablet,
  getBackgroundCollorByText,
  getRandomAvatarNumber,
  isEmptyString,
  isValidateEmail,
  getGradientBackgroundByAddress,
  resolveIPFSLink,
  isNumeric,
  get6DigitOfDid,
};
export default exports;
