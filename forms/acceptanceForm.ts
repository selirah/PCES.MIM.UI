import { ENV } from '../env';

export const acceptanceFormIO = {
    "display": "form",
    "components": [
        {
            "label": "Columns",
            "columns": [
                {
                    "components": [
                        {
                            "title": "Intervention Form",
                            "collapsible": false,
                            "key": "interventionForm",
                            "type": "panel",
                            "label": "Panel",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "Code",
                                    "placeholder": "Enter item code",
                                    "tableView": true,
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "Code",
                                    "type": "textfield",
                                    "input": true
                                },
                                {
                                    "label": "Intervention Type",
                                    "placeholder": "Select intervention type",
                                    "tableView": true,
                                    "data": {
                                        "values": [
                                            {
                                                "label": "Type A",
                                                "value": "typeA"
                                            },
                                            {
                                                "label": "Type B",
                                                "value": "typeB"
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "interventionType",
                                    "type": "select",
                                    "input": true
                                },
                                {
                                    "label": "Complexity",
                                    "placeholder": "Select complexity ",
                                    "tableView": true,
                                    "data": {
                                        "values": [
                                            {
                                                "label": "Type A",
                                                "value": "typeA"
                                            },
                                            {
                                                "label": "Type B",
                                                "value": "typeB"
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "complexity",
                                    "type": "select",
                                    "input": true
                                },
                                {
                                    "label": "Date of Intervention",
                                    "format": "yyyy-MM-dd",
                                    "placeholder": "Select intervention date",
                                    "tableView": false,
                                    "enableMinDateInput": false,
                                    "datePicker": {
                                        "disableWeekends": false,
                                        "disableWeekdays": false
                                    },
                                    "enableMaxDateInput": false,
                                    "enableTime": false,
                                    "timePicker": {
                                        "showMeridian": false
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "dateOfIntervention",
                                    "type": "datetime",
                                    "input": true,
                                    "widget": {
                                        "type": "calendar",
                                        "displayInTimezone": "viewer",
                                        "locale": "en",
                                        "useLocaleSettings": false,
                                        "allowInput": true,
                                        "mode": "single",
                                        "enableTime": false,
                                        "noCalendar": false,
                                        "format": "yyyy-MM-dd",
                                        "hourIncrement": 1,
                                        "minuteIncrement": 1,
                                        "time_24hr": true,
                                        "minDate": null,
                                        "disableWeekends": false,
                                        "disableWeekdays": false,
                                        "maxDate": null
                                    }
                                },
                                {
                                    "label": "Attach Photo",
                                    "tableView": false,
                                    "storage": "base64",
                                    "image": true,
                                    "webcam": false,
                                    "fileTypes": [
                                        {
                                            "label": "",
                                            "value": ""
                                        }
                                    ],
                                    "filePattern": ".jpg,.png",
                                    "fileMinSize": "1KB",
                                    "fileMaxSize": "1MB",
                                    "key": "interventionImage",
                                    "type": "file",
                                    "input": true
                                }
                            ]
                        }
                    ],
                    "width": 6,
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                },
                {
                    "components": [
                        {
                            "title": "Cost Center",
                            "collapsible": false,
                            "key": "costCenterP",
                            "type": "panel",
                            "label": "Panel",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "Cost Center",
                                    "placeholder": "Select cost center",
                                    "tableView": true,
                                    "dataSrc": "url",
                                    "data": {
                                        "url": `${ENV.NEXT_PUBLIC_API_ENDPOINT}/cost-center`,
                                        "headers": [
                                            {
                                                "key": "",
                                                "value": ""
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "costCenter",
                                    "type": "select",
                                    "input": true,
                                    "disableLimit": false
                                },
                                {
                                    "label": "City",
                                    "placeholder": "Select City",
                                    "tableView": true,
                                    "dataSrc": "url",
                                    "data": {
                                        "url": `${ENV.NEXT_PUBLIC_API_ENDPOINT}/cities`,
                                        "headers": [
                                            {
                                                "key": "",
                                                "value": ""
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "city",
                                    "type": "select",
                                    "input": true,
                                    "disableLimit": false
                                },
                                {
                                    "label": "Hospital",
                                    "placeholder": "Select hospital",
                                    "tableView": true,
                                    "dataSrc": "url",
                                    "data": {
                                        "url": `${ENV.NEXT_PUBLIC_API_ENDPOINT}/hospitals`,
                                        "headers": [
                                            {
                                                "key": "",
                                                "value": ""
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "hospital",
                                    "type": "select",
                                    "input": true,
                                    "disableLimit": false
                                },
                                {
                                    "label": "Surgical Block",
                                    "placeholder": "Select the surgical block",
                                    "tableView": true,
                                    "dataSrc": "url",
                                    "data": {
                                        "url": `${ENV.NEXT_PUBLIC_API_ENDPOINT}/surgicalblocks`,
                                        "headers": [
                                            {
                                                "key": "",
                                                "value": ""
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "surgicalBlock",
                                    "type": "select",
                                    "input": true,
                                    "disableLimit": false
                                }
                            ]
                        }
                    ],
                    "width": 6,
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                }
            ],
            "key": "columns",
            "type": "columns",
            "input": false,
            "tableView": false
        },
        {
            "label": "Submit",
            "showValidations": false,
            "block": true,
            "disableOnInvalid": true,
            "tableView": false,
            "key": "submit",
            "type": "button",
            "input": true,
            "saveOnEnter": false
        }
    ]
}

export const acceptanceDataGrid = {
    "display": "form",
    "components": [
        {
            "label": "Read Barcodes",
            "reorder": false,
            "addAnother": "Add Barcode",
            "addAnotherPosition": "bottom",
            "layoutFixed": false,
            "enableRowGroups": false,
            "initEmpty": false,
            "hideLabel": true,
            "tableView": false,
            "defaultValue": [
                {
                    "costCenter": "",
                    "code": "",
                    "description": "",
                    "notes": "",
                    "causalUse": "",
                    "interventionDate": ""
                }
            ],
            "key": "readBarcodes",
            "type": "datagrid",
            "input": true,
            "components": [
                {
                    "label": "Cost Center",
                    "tableView": true,
                    "key": "costCenter",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Code",
                    "tableView": true,
                    "key": "code",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Description",
                    "tableView": true,
                    "key": "description",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Notes",
                    "tableView": true,
                    "key": "notes",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Causal Use",
                    "tableView": true,
                    "key": "causalUse",
                    "type": "select",
                    "input": true
                },
                {
                    "label": "Intervention Date",
                    "format": "yyyy-MM-dd",
                    "tableView": false,
                    "enableMinDateInput": false,
                    "datePicker": {
                        "disableWeekends": false,
                        "disableWeekdays": false
                    },
                    "enableMaxDateInput": false,
                    "enableTime": false,
                    "timePicker": {
                        "showMeridian": false
                    },
                    "key": "interventionDate",
                    "type": "datetime",
                    "input": true,
                    "widget": {
                        "type": "calendar",
                        "displayInTimezone": "viewer",
                        "locale": "en",
                        "useLocaleSettings": false,
                        "allowInput": true,
                        "mode": "single",
                        "enableTime": false,
                        "noCalendar": false,
                        "format": "yyyy-MM-dd",
                        "hourIncrement": 1,
                        "minuteIncrement": 1,
                        "time_24hr": true,
                        "minDate": null,
                        "disableWeekends": false,
                        "disableWeekdays": false,
                        "maxDate": null
                    }
                }
            ]
        },
        {
            "label": "Submit",
            "showValidations": false,
            "block": true,
            "disableOnInvalid": true,
            "tableView": false,
            "key": "submit",
            "type": "button",
            "input": true,
            "saveOnEnter": false
        }
    ]
}

export const testForm = {
    "display": "form",
    "components": [
        {
            "label": "Columns",
            "columns": [
                {
                    "components": [
                        {
                            "title": "Panel A",
                            "collapsible": false,
                            "key": "panelA",
                            "type": "panel",
                            "label": "Panel",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "Code",
                                    "placeholder": "Enter intervention code here",
                                    "tableView": true,
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "interventionCode",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        }
                    ],
                    "width": 6,
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                },
                {
                    "components": [],
                    "width": 6,
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                }
            ],
            "key": "columns",
            "type": "columns",
            "input": false,
            "tableView": false
        },
        {
            "type": "button",
            "label": "Submit",
            "key": "submit",
            "disableOnInvalid": true,
            "input": true,
            "tableView": false
        }
    ]
}