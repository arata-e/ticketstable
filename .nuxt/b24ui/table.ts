const loadingAnimation = [
  "loading",
  "carousel",
  "carousel-inverse",
  "swing",
  "elastic"
] as const

const loadingColor = [
  "air-primary",
  "air-primary-success",
  "air-primary-alert",
  "air-primary-copilot",
  "air-primary-warning"
] as const

export default {
  "slots": {
    "root": "relative overflow-auto",
    "base": "min-w-full font-[family-name:var(--ui-font-family-primary)]",
    "caption": "sr-only",
    "thead": "relative",
    "tbody": "[&>tr]:data-[selectable=true]:hover:bg-(--ui-color-bg-content-secondary) light:[&>tr]:data-[selectable=true]:hover:bg-[#f6f8f9] [&>tr]:data-[selectable=true]:focus-visible:outline-(--ui-color-accent-soft-element-blue) [&>tr]:data-[selected=true]:hover:bg-(--ui-color-bg-content-secondary) light:[&>tr]:data-[selected=true]:hover:bg-(#eff7d7) [&>tr]:data-[selected=true]:focus-visible:outline-(--ui-color-accent-soft-element-blue)",
    "tfoot": "relative",
    "tr": "data-[selected=true]:bg-(--ui-color-bg-content-tertiary) light:data-[selected=true]:bg-[#f4fcde]",
    "th": "px-4 py-3.5 text-(length:--ui-font-size-md)/(--ui-font-line-height-md) text-(--b24ui-typography-label-color) whitespace-nowrap text-left rtl:text-right font-(--ui-font-weight-normal) [&:has([role=checkbox])]:pe-0 align-middle",
    "td": "p-4 text-(length:--ui-font-size-md)/(--ui-font-line-height-md) text-(--b24ui-typography-label-color) whitespace-nowrap font-(--ui-font-weight-normal) [&:has([role=checkbox])]:pe-0 align-middle",
    "separator": "absolute z-[1] left-0 w-full h-px bg-(--ui-color-design-tinted-na-stroke)",
    "empty": "py-6 text-center text-(length:--ui-font-size-sm) text-(--b24ui-typography-description-color)",
    "loading": "py-6 text-center"
  },
  "variants": {
    "virtualize": {
      "true": {
        "tr": "relative before:absolute before:z-1 before:w-full before:border-b before:border-b-(--ui-color-design-tinted-na-stroke)"
      },
      "false": {
        "base": "overflow-clip",
        "tbody": "divide-y divide-(--ui-color-design-tinted-na-stroke)"
      }
    },
    "pinned": {
      "true": {
        "th": "sticky bg-(--ui-color-bg-content-primary) data-[pinned=left]:left-0 data-[pinned=right]:right-0",
        "td": "sticky bg-(--ui-color-bg-content-primary) data-[pinned=left]:left-0 data-[pinned=right]:right-0"
      }
    },
    "sticky": {
      "true": {
        "thead": "sticky top-0 inset-x-0 bg-(--ui-color-bg-content-primary) z-[1] backdrop-blur",
        "tfoot": "sticky bottom-0 inset-x-0 bg-(--ui-color-bg-content-primary) z-[1] backdrop-blur"
      },
      "header": {
        "thead": "sticky top-0 inset-x-0 bg-(--ui-color-bg-content-primary) z-[1] backdrop-blur"
      },
      "footer": {
        "tfoot": "sticky bottom-0 inset-x-0 bg-(--ui-color-bg-content-primary) z-[1] backdrop-blur"
      }
    },
    "loading": {
      "true": {
        "thead": "after:absolute after:z-[1] after:h-px after:bg-(--b24ui-background)"
      }
    },
    "loadingAnimation": {
      "loading": "",
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "loadingColor": {
      "air-primary": {
        "root": "style-filled"
      },
      "air-primary-success": {
        "root": "style-filled-success"
      },
      "air-primary-alert": {
        "root": "style-filled-alert"
      },
      "air-primary-copilot": {
        "root": "style-filled-copilot"
      },
      "air-primary-warning": {
        "root": "style-filled-warning"
      }
    }
  },
  "compoundVariants": [
    {
      "loading": true,
      "loadingAnimation": "loading" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[progressbar-loading_2s_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel-inverse" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "swing" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "elastic" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[elastic_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "loadingColor": "air-primary" as typeof loadingColor[number],
    "loadingAnimation": "loading" as typeof loadingAnimation[number]
  }
}