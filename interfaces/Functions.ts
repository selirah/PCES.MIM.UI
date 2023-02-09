import { instanceOf } from "prop-types";

export function getBase64(file, onSet: any): void {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    onSet(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function getBase64Tray(
  file,
  onSet,
  containers,
  containerNumber,
  trayNumber
): void {
  var containersCopy = [...containers];
  var container = containersCopy[containerNumber - 1];
  var tray = container.trays[trayNumber - 1];
  var reader = new FileReader();
  if (reader && file && file instanceof Blob) {
    reader.readAsDataURL(file);
    reader.onload = function () {
      tray.imageBase64 = reader.result;
      container.trays[trayNumber - 1] = tray;
      containersCopy[containerNumber - 1] = container;
      onSet(containersCopy);
    };
  }
}
