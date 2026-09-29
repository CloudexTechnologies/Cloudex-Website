/**
 * The `<svg id="…">` sprite the Solutions section's icons reach with `<use href="#…">`.
 *
 * On the live site Framer's runtime ships ONE `<div id="svg-templates">` at the end of
 * `<body>` holding every symbol the whole page needs (see the block at the tail of
 * `_source/live/home.html`). Only the 28 symbols THIS section references are kept here,
 * and the container carries a section-scoped id so it cannot collide with a page-level
 * sprite another section may mount.
 *
 * ORCHESTRATOR NOTE: if a page-level home sprite is added later (`/about` already has
 * `components/about/SvgTemplates.tsx` as precedent), hoist these symbols into it and drop
 * this file — duplicate element ids would otherwise appear in the document. `<use>`
 * resolves to the first match, so rendering stays correct either way.
 */

export function SolutionsSvgTemplates() {
  return (
    <div
      id="solutions-svg-templates"
      aria-hidden="true"
      style={{
        position: "absolute",
        overflow: "hidden",
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 0,
        contain: "strict",
      }}
    >
      <svg viewBox="0 0 15.856 18.122" overflow="visible" id="svg-145902458_1249">
        <path
          d="M 6.229 0 C 5.916 0 5.663 0.254 5.663 0.566 C 5.663 0.879 5.916 1.133 6.229 1.133 L 6.795 1.133 L 6.795 2.345 C 2.68 2.939 -0.277 6.613 0.021 10.76 C 0.318 14.908 3.77 18.121 7.928 18.122 C 11.032 18.122 13.85 16.31 15.14 13.487 C 16.429 10.664 15.952 7.347 13.92 5.002 L 13.934 4.988 L 14.335 4.587 L 14.735 4.988 C 14.877 5.135 15.088 5.194 15.286 5.143 C 15.484 5.091 15.639 4.936 15.69 4.738 C 15.742 4.54 15.683 4.329 15.536 4.187 L 13.934 2.585 C 13.792 2.437 13.582 2.378 13.384 2.43 C 13.186 2.482 13.031 2.637 12.979 2.835 C 12.927 3.033 12.986 3.243 13.134 3.385 L 13.535 3.786 L 13.134 4.187 L 13.12 4.201 C 11.974 3.205 10.564 2.561 9.061 2.346 L 9.061 1.133 L 9.627 1.133 C 9.94 1.133 10.193 0.879 10.193 0.566 C 10.193 0.254 9.94 0 9.627 0 Z M 8.457 6.279 L 8.457 10.13 C 8.457 10.443 8.204 10.696 7.891 10.696 L 3.927 10.696 C 3.614 10.696 3.36 10.443 3.36 10.13 C 3.36 9.817 3.614 9.564 3.927 9.564 L 7.324 9.564 L 7.324 6.279 C 7.324 5.966 7.578 5.713 7.891 5.713 C 8.204 5.713 8.457 5.966 8.457 6.279"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 20 20" overflow="visible" id="svg-999184187_681">
        <path
          d="M 20 10 C 20 15.523 15.523 20 10 20 C 4.477 20 0 15.523 0 10 C 0 4.477 4.477 0 10 0 C 15.523 0 20 4.477 20 10 M 15.038 6.212 C 14.857 6.033 14.611 5.934 14.357 5.939 C 14.102 5.944 13.86 6.053 13.688 6.24 L 9.346 11.771 L 6.73 9.154 C 6.361 8.81 5.785 8.82 5.428 9.177 C 5.071 9.534 5.061 10.109 5.405 10.479 L 8.713 13.787 C 8.893 13.967 9.138 14.066 9.392 14.061 C 9.647 14.057 9.888 13.949 10.061 13.762 L 15.051 7.525 C 15.405 7.157 15.4 6.574 15.039 6.212 Z"
          fill="var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 13.5 18" overflow="visible" id="svg-1510731266_1096">
        <path
          d="M 8.205 0 L 2.25 0 C 1.007 0 0 1.007 0 2.25 L 0 15.75 C 0 16.993 1.007 18 2.25 18 L 11.25 18 C 12.493 18 13.5 16.993 13.5 15.75 L 13.5 5.295 C 13.5 4.997 13.381 4.711 13.17 4.5 L 9 0.33 C 8.789 0.119 8.503 0 8.205 0 M 8.438 3.938 L 8.438 1.688 L 11.813 5.063 L 9.563 5.063 C 8.941 5.063 8.438 4.559 8.438 3.938 M 2.813 10.125 C 2.502 10.125 2.25 9.873 2.25 9.563 C 2.25 9.252 2.502 9 2.813 9 L 10.688 9 C 10.998 9 11.25 9.252 11.25 9.563 C 11.25 9.873 10.998 10.125 10.688 10.125 Z M 2.25 11.813 C 2.25 11.502 2.502 11.25 2.813 11.25 L 10.688 11.25 C 10.998 11.25 11.25 11.502 11.25 11.813 C 11.25 12.123 10.998 12.375 10.688 12.375 L 2.813 12.375 C 2.502 12.375 2.25 12.123 2.25 11.813 M 2.813 14.625 C 2.502 14.625 2.25 14.373 2.25 14.063 C 2.25 13.752 2.502 13.5 2.813 13.5 L 7.313 13.5 C 7.623 13.5 7.875 13.752 7.875 14.063 C 7.875 14.373 7.623 14.625 7.313 14.625 Z"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 20 20" overflow="visible" id="svg2091700416_826">
        <path
          d="M 10 0 C 4.477 0 0 4.477 0 10 C 0 15.523 4.477 20 10 20 C 15.523 20 20 15.523 20 10 C 19.994 4.48 15.52 0.006 10 0 Z M 10 16.923 C 6.866 16.924 4.123 14.819 3.312 11.792 C 2.501 8.765 3.824 5.57 6.538 4.004 C 6.905 3.805 7.363 3.934 7.572 4.295 C 7.78 4.656 7.663 5.118 7.308 5.336 C 5.197 6.554 4.168 9.038 4.799 11.392 C 5.43 13.746 7.563 15.383 10 15.383 C 12.437 15.383 14.57 13.746 15.201 11.392 C 15.832 9.038 14.803 6.554 12.692 5.336 C 12.337 5.118 12.22 4.656 12.428 4.295 C 12.637 3.934 13.095 3.805 13.462 4.004 C 16.176 5.57 17.499 8.765 16.688 11.792 C 15.877 14.819 13.134 16.924 10 16.923 Z"
          fill="var(--token-b3c11e1e-3e83-4bec-9857-d0985ddf2f3d, rgb(255, 152, 0))"
        />
      </svg>
      {"\n"}
      <svg
        id="2922751717"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="18px"
          id="LMIUelWZE"
          transform="translate(3 3)"
          width="18px"
        />
        <path
          d="M 0 0 L 0 1.5"
          fill="transparent"
          height="1.5px"
          id="ou4J5FGNY"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(12 6.75)"
          width="1px"
        />
        <path
          d="M 0 0 L 0 1.5"
          fill="transparent"
          height="1.5px"
          id="R94JioAA1"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(12 15.75)"
          width="1px"
        />
        <path
          d="M 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 Z"
          fill="transparent"
          height="18px"
          id="v8AfKHwco"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3 3)"
          width="18px"
        />
        <path
          d="M 0.75 7.5 L 4.125 7.5 C 5.161 7.5 6 6.661 6 5.625 C 6 4.589 5.161 3.75 4.125 3.75 L 1.875 3.75 C 0.839 3.75 0 2.911 0 1.875 C 0 0.839 0.839 0 1.875 0 L 5.25 0"
          fill="transparent"
          height="7.5px"
          id="tlMKNQNYo"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(9 8.25)"
          width="6px"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 20 20" overflow="visible" id="svg1811482918_771">
        <path
          d="M 10 0 C 4.477 0 0 4.477 0 10 C 0 15.523 4.477 20 10 20 C 15.523 20 20 15.523 20 10 C 19.994 4.48 15.52 0.006 10 0 Z M 13.621 12.533 C 13.922 12.833 13.922 13.321 13.621 13.621 C 13.321 13.922 12.833 13.922 12.533 13.621 L 10 11.088 L 7.467 13.621 C 7.167 13.922 6.679 13.922 6.379 13.621 C 6.078 13.321 6.078 12.833 6.379 12.533 L 8.913 10 L 6.379 7.467 C 6.078 7.167 6.078 6.679 6.379 6.379 C 6.679 6.078 7.167 6.078 7.467 6.379 L 10 8.913 L 12.533 6.379 C 12.833 6.078 13.321 6.078 13.621 6.379 C 13.922 6.679 13.922 7.167 13.621 7.467 L 11.088 10 Z"
          fill="var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 262 54" overflow="visible" id="svg624784995_369">
        <path
          d="M 131 0 C 203.349 0 262 12.088 262 27 C 262 41.912 203.349 54 131 54 C 58.651 54 0 41.912 0 27 C 0 12.088 58.651 0 131 0 Z"
          fill="var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3))"
          fillOpacity="1"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 45.002 44.999" overflow="visible" id="svg-1028717113_800">
        <path
          d="M 5.303 1.435 C 6.298 0.441 7.673 -0.078 9.077 0.01 C 10.481 0.097 11.78 0.783 12.644 1.893 L 17.692 8.379 C 18.618 9.569 18.944 11.118 18.578 12.581 L 17.04 18.74 C 16.879 19.389 17.069 20.075 17.54 20.549 L 24.451 27.459 C 24.925 27.932 25.612 28.122 26.262 27.96 L 32.419 26.421 C 33.881 26.058 35.429 26.384 36.621 27.307 L 43.106 32.353 C 45.438 34.167 45.652 37.613 43.565 39.697 L 40.657 42.605 C 38.575 44.686 35.465 45.6 32.565 44.579 C 25.142 41.971 18.402 37.722 12.849 32.148 C 7.276 26.595 3.026 19.857 0.418 12.435 C -0.601 9.538 0.314 6.424 2.395 4.343 Z"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 210 54" overflow="visible" id="svg1890931538_365">
        <path
          d="M 105 0 C 162.99 0 210 12.088 210 27 C 210 41.912 162.99 54 105 54 C 47.01 54 0 41.912 0 27 C 0 12.088 47.01 0 105 0 Z"
          fill="var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3))"
          fillOpacity="1"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 11.989 11.988" overflow="visible" id="svg-131771748_1622">
        <g>
          <path
            d="M 9.119 7.141 C 10.847 5.199 11.575 3.631 11.847 2.482 C 12.004 1.817 12.007 1.298 11.967 0.935 C 11.951 0.792 11.924 0.651 11.886 0.513 C 11.87 0.454 11.851 0.397 11.828 0.34 L 11.828 0.34 C 11.773 0.217 11.702 0.164 11.564 0.118 C 11.524 0.106 11.484 0.094 11.444 0.085 C 11.303 0.051 11.161 0.028 11.017 0.015 C 10.65 -0.018 10.125 -0.007 9.458 0.156 C 8.307 0.436 6.747 1.162 4.841 2.857 L 3.043 3.035 L 3.038 3.035 C 2.606 3.083 2.203 3.277 1.896 3.585 L 0.111 5.373 C -0.004 5.49 -0.033 5.667 0.04 5.815 C 0.114 5.962 0.273 6.046 0.436 6.023 L 1.857 5.82 C 2.067 5.79 2.3 5.83 2.572 5.919 C 2.746 5.976 2.9 6.039 3.063 6.105 L 3.215 6.167 C 3.362 6.779 3.71 7.351 4.171 7.812 C 4.63 8.272 5.202 8.621 5.813 8.769 L 5.874 8.92 C 5.941 9.084 6.004 9.238 6.061 9.413 C 6.149 9.685 6.189 9.919 6.159 10.129 L 5.956 11.553 C 5.934 11.716 6.018 11.874 6.165 11.948 C 6.312 12.021 6.489 11.993 6.606 11.877 L 8.391 10.089 C 8.698 9.782 8.892 9.378 8.94 8.946 Z M 9.201 4.37 C 8.604 4.969 7.755 5.09 7.307 4.641 C 6.859 4.191 6.98 3.342 7.577 2.743 C 8.175 2.145 9.024 2.024 9.472 2.473 C 9.92 2.922 9.799 3.771 9.202 4.37 Z"
            fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
          />
          <path
            d="M 3.943 8.093 C 4.34 8.496 4.796 8.838 5.294 9.106 C 4.457 9.861 1.601 10.626 1.507 10.532 C 1.413 10.437 2.059 7.393 2.885 6.651 C 3.145 7.168 3.512 7.662 3.943 8.093"
            fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
          />
        </g>
      </svg>
      {"\n"}
      <svg viewBox="0 0 12.002 12.001" overflow="visible" id="svg809634881_763">
        <path
          d="M 8.809 7.758 C 10.315 5.702 9.984 2.833 8.049 1.174 C 6.114 -0.485 3.228 -0.373 1.427 1.429 C -0.375 3.232 -0.484 6.118 1.176 8.052 C 2.837 9.986 5.706 10.315 7.761 8.807 L 7.76 8.807 C 7.782 8.837 7.806 8.865 7.833 8.893 L 10.721 11.781 C 11.014 12.074 11.489 12.074 11.782 11.781 C 12.076 11.488 12.076 11.013 11.783 10.72 L 8.895 7.832 C 8.868 7.805 8.839 7.78 8.809 7.757 Z M 9.002 4.874 C 9.002 7.153 7.155 9 4.876 9 C 2.598 9 0.751 7.153 0.751 4.874 C 0.751 2.596 2.598 0.749 4.876 0.749 C 7.155 0.749 9.002 2.596 9.002 4.874"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9.001 4.847" overflow="visible" id="svg1083438117_497">
        <path
          d="M 4.255 0.102 C 4.32 0.037 4.408 0 4.5 0 C 4.592 0 4.681 0.037 4.746 0.102 L 8.899 4.256 C 9.035 4.391 9.035 4.61 8.899 4.746 C 8.764 4.881 8.545 4.881 8.409 4.746 L 4.5 0.836 L 0.592 4.746 C 0.456 4.881 0.237 4.881 0.102 4.746 C -0.034 4.61 -0.034 4.391 0.102 4.256 Z"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9.015 9.015" overflow="visible" id="svg343723450_985">
        <path
          d="M 0 0.646 C 0 0.289 0.296 0 0.662 0 L 8.353 0 C 8.718 0 9.015 0.289 9.015 0.646 L 9.015 8.369 C 9.015 8.726 8.718 9.015 8.353 9.015 L 0.662 9.015 C 0.296 9.015 0 8.726 0 8.369 Z M 2.782 7.54 L 2.782 3.469 L 1.43 3.469 L 1.43 7.54 Z M 2.106 2.917 C 2.578 2.917 2.871 2.605 2.871 2.214 C 2.863 1.814 2.578 1.51 2.115 1.51 C 1.652 1.51 1.35 1.815 1.35 2.214 C 1.35 2.605 1.643 2.917 2.097 2.917 Z M 4.867 7.54 L 4.867 5.267 C 4.867 5.145 4.877 5.023 4.913 4.937 C 5.01 4.694 5.233 4.442 5.607 4.442 C 6.096 4.442 6.292 4.815 6.292 5.362 L 6.292 7.54 L 7.645 7.54 L 7.645 5.205 C 7.645 3.954 6.978 3.373 6.087 3.373 C 5.37 3.373 5.048 3.767 4.867 4.045 L 4.867 4.059 L 4.858 4.059 L 4.867 4.045 L 4.867 3.469 L 3.515 3.469 C 3.532 3.851 3.515 7.54 3.515 7.54 Z"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9 6.75" overflow="visible" id="svg-682395581_529">
        <path
          d="M 0.028 0.875 C 0.145 0.363 0.6 0 1.125 0 L 7.875 0 C 8.4 0 8.855 0.363 8.972 0.875 L 4.5 3.608 Z M 0 1.517 L 0 5.513 L 3.264 3.512 Z M 3.803 3.842 L 0.107 6.107 C 0.294 6.5 0.69 6.75 1.125 6.75 L 7.875 6.75 C 8.31 6.75 8.706 6.5 8.892 6.106 L 5.196 3.841 L 4.5 4.267 Z M 5.736 3.512 L 9 5.513 L 9 1.517 Z"
          fill="var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9 9" overflow="visible" id="svg921421248_950">
        <path
          d="M 0 4.365 C 0 1.857 1.965 0 4.5 0 C 7.035 0 9 1.857 9 4.365 C 9 6.873 7.035 8.73 4.5 8.73 C 4.044 8.73 3.608 8.67 3.197 8.557 C 3.118 8.535 3.033 8.541 2.957 8.574 L 2.064 8.969 C 1.954 9.017 1.828 9.008 1.727 8.944 C 1.625 8.88 1.562 8.77 1.559 8.651 L 1.534 7.85 C 1.53 7.752 1.487 7.659 1.413 7.594 C 0.538 6.811 0 5.677 0 4.365 M 3.12 3.544 L 1.798 5.641 C 1.671 5.843 1.918 6.069 2.108 5.926 L 3.528 4.848 C 3.624 4.775 3.757 4.775 3.853 4.847 L 4.904 5.636 C 5.055 5.749 5.246 5.794 5.432 5.759 C 5.617 5.725 5.78 5.615 5.88 5.456 L 7.202 3.359 C 7.329 3.157 7.082 2.931 6.892 3.074 L 5.472 4.152 C 5.376 4.225 5.243 4.225 5.147 4.153 L 4.096 3.364 C 3.945 3.251 3.754 3.206 3.568 3.24 C 3.383 3.274 3.22 3.384 3.12 3.544 Z"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9 9" overflow="visible" id="svg-1913880184_1057">
        <path
          d="M 1.061 0.287 C 1.26 0.089 1.535 -0.015 1.815 0.002 C 2.096 0.02 2.356 0.157 2.529 0.379 L 3.538 1.676 C 3.723 1.914 3.789 2.224 3.716 2.517 L 3.408 3.749 C 3.376 3.878 3.414 4.015 3.508 4.11 L 4.89 5.492 C 4.985 5.587 5.122 5.625 5.252 5.592 L 6.484 5.285 C 6.776 5.212 7.086 5.277 7.324 5.462 L 8.621 6.471 C 9.087 6.834 9.13 7.523 8.713 7.94 L 8.131 8.521 C 7.715 8.938 7.093 9.12 6.513 8.916 C 5.028 8.395 3.68 7.545 2.57 6.43 C 1.455 5.319 0.605 3.972 0.084 2.487 C -0.12 1.908 0.063 1.285 0.479 0.869 Z M 6.469 0 L 8.719 0 C 8.874 0 9 0.126 9 0.281 L 9 2.531 C 9 2.687 8.874 2.813 8.719 2.813 C 8.564 2.813 8.438 2.687 8.438 2.531 L 8.438 0.96 L 6.106 3.293 C 5.996 3.403 5.817 3.403 5.707 3.293 C 5.597 3.183 5.597 3.005 5.707 2.895 L 8.04 0.563 L 6.469 0.563 C 6.314 0.563 6.188 0.437 6.188 0.281 C 6.188 0.126 6.314 0 6.469 0 Z"
          fill="var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 9 8.399" overflow="visible" id="svg1859317262_498">
        <path
          d="M 4.5 7.875 C 6.985 7.875 9 6.112 9 3.938 C 9 1.763 6.985 0 4.5 0 C 2.015 0 0 1.763 0 3.938 C 0 4.927 0.418 5.833 1.108 6.525 C 1.054 7.096 0.874 7.723 0.674 8.193 C 0.63 8.298 0.716 8.415 0.828 8.397 C 2.097 8.189 2.851 7.869 3.179 7.703 C 3.61 7.818 4.054 7.876 4.5 7.875"
          fill="var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))"
        />
      </svg>
      {"\n"}
      <svg
        id="207206324"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 9.001 0 C 5.784 0 2.812 1.716 1.204 4.503 C -0.403 7.289 -0.401 10.722 1.21 13.507 L 1.21 13.507 L 0.041 17.012 C -0.049 17.281 0.021 17.579 0.222 17.779 C 0.423 17.98 0.72 18.051 0.989 17.961 L 4.495 16.792 L 4.495 16.792 C 7.77 18.686 11.881 18.328 14.781 15.897 C 17.681 13.466 18.75 9.481 17.457 5.925 C 16.164 2.368 12.785 0.001 9.001 0 Z M 11.251 14.25 C 7.109 14.25 3.751 10.892 3.751 6.75 C 3.751 5.093 5.094 3.75 6.751 3.75 L 8.251 6.75 L 7.096 8.482 C 7.554 9.576 8.425 10.447 9.52 10.905 L 11.251 9.75 L 14.251 11.25 C 14.251 12.907 12.908 14.25 11.251 14.25 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="18.000072791893746px"
          id="zdUrVx04b"
          transform="translate(2.999 3)"
          width="17.999633069364176px"
        />
        <path
          d="M 0 3 C 0 1.343 1.343 0 3 0 L 4.5 3 L 3.345 4.732 C 3.803 5.826 4.674 6.697 5.768 7.155 L 7.5 6 L 10.5 7.5 C 10.5 9.157 9.157 10.5 7.5 10.5 C 3.358 10.5 0 7.142 0 3 Z"
          fill="transparent"
          height="10.5px"
          id="Xhg5dzQDU"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(6.75 6.75)"
          width="10.5px"
        />
        <path
          d="M 4.493 16.79 C 8.403 19.053 13.386 18.066 16.138 14.483 C 18.891 10.9 18.56 5.831 15.365 2.636 C 12.17 -0.559 7.101 -0.89 3.518 1.863 C -0.065 4.615 -1.052 9.598 1.211 13.508 L 1.211 13.508 L 0.039 17.01 C -0.051 17.279 0.019 17.577 0.22 17.777 C 0.421 17.978 0.718 18.049 0.987 17.959 Z"
          fill="transparent"
          height="18.00072584206196px"
          id="vVGlEI9Xq"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3.001 3.002)"
          width="18.000910893351044px"
        />
      </svg>
      {"\n"}
      <svg
        id="942143898"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 13.5 0 L 4.5 0 C 2.015 0 0 2.015 0 4.5 L 0 13.5 C 0 15.985 2.015 18 4.5 18 L 13.5 18 C 15.985 18 18 15.985 18 13.5 L 18 4.5 C 18 2.015 15.985 0 13.5 0 Z M 9 12.75 C 6.929 12.75 5.25 11.071 5.25 9 C 5.25 6.929 6.929 5.25 9 5.25 C 11.071 5.25 12.75 6.929 12.75 9 C 12.75 11.071 11.071 12.75 9 12.75 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="18px"
          id="SuXKGhab5"
          transform="translate(3 3)"
          width="18px"
        />
        <path
          d="M 4.5 18 C 2.015 18 0 15.985 0 13.5 L 0 4.5 C 0 2.015 2.015 0 4.5 0 L 13.5 0 C 15.985 0 18 2.015 18 4.5 L 18 13.5 C 18 15.985 15.985 18 13.5 18 Z"
          fill="transparent"
          height="18px"
          id="vvJ8FLDVj"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3 3)"
          width="18px"
        />
        <path
          d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z"
          fill="transparent"
          height="7.5px"
          id="Q3v7fjWhv"
          strokeDasharray=""
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(8.25 8.25)"
          width="7.5px"
        />
        <path
          d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="2.25px"
          id="VxeO4Hprj"
          transform="translate(15.75 6)"
          width="2.25px"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 262 54" overflow="visible" id="svg1061246238_352">
        <path
          d="M 131 0 C 203.349 0 262 12.088 262 27 C 262 41.912 203.349 54 131 54 C 58.651 54 0 41.912 0 27 C 0 12.088 58.651 0 131 0 Z"
          fill="var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3))"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 595 71" overflow="visible" id="svg-642365558_864">
        <g>
          <defs>
            <linearGradient
              id="svg-642365558_864_idsCVYUyBJ3p_1g206074869"
              x1="0.49751243781094523"
              x2="0.5046766169154229"
              y1="0"
              y2="1.44"
            >
              <stop
                offset="0"
                stopColor={'var(--token-5c4c4689-2e9f-4d75-8648-a6fa99ee1dd8, rgba(255, 255, 255, 0.5)) /* {"name":"FFFFFF 50"} */'}
                stopOpacity="1"
              />
              <stop offset="1" stopColor="rgba(0, 0, 0, 0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 6.556 35 L 33.715 46.5 L 63.995 21 L 77.731 35 L 120.811 5 L 155.15 33 L 221.642 5 L 264.41 38 L 286.886 13.5 L 314.982 26 L 339.643 11 L 361.554 18 L 381.533 5 L 397.083 0 L 417.062 21 L 441.411 13.5 L 458.893 35 L 498.851 11 L 515.708 38 L 552.545 0 L 595 71 L 0 71 L 0.312 35 Z"
            fill="url(#svg-642365558_864_idsCVYUyBJ3p_1g206074869)"
          />
        </g>
      </svg>
      {"\n"}
      <svg
        id="2570385411"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 14.25 0 L 0.75 0 C 0.336 0 0 0.336 0 0.75 L 0 14.25 C 0 14.664 0.336 15 0.75 15 L 14.25 15 C 14.664 15 15 14.664 15 14.25 L 15 0.75 C 15 0.336 14.664 0 14.25 0 Z M 9.75 9.75 L 5.25 9.75 L 5.25 5.25 L 9.75 5.25 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="15px"
          id="vuCALP9Al"
          transform="translate(4.5 4.5)"
          width="15px"
        />
        <path
          d="M 0 4.5 L 0 0 L 4.5 0 L 4.5 4.5 Z"
          fill="transparent"
          height="4.5px"
          id="kLpHJ1RZy"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(9.75 9.75)"
          width="4.5px"
        />
        <path
          d="M 0.75 15 C 0.336 15 0 14.664 0 14.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 14.25 0 C 14.664 0 15 0.336 15 0.75 L 15 14.25 C 15 14.664 14.664 15 14.25 15 Z"
          fill="transparent"
          height="15px"
          id="N7IVsWduk"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(4.5 4.5)"
          width="15px"
        />
        <path
          d="M 0 0 L 2.25 0"
          fill="transparent"
          height="1px"
          id="LutRKWr3x"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(19.5 9.75)"
          width="2.25px"
        />
        <path
          d="M 0 0 L 2.25 0"
          fill="transparent"
          height="1px"
          id="MrdVhfylo"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(19.5 14.25)"
          width="2.25px"
        />
        <path
          d="M 0 0 L 2.25 0"
          fill="transparent"
          height="1px"
          id="i5MXyvBIU"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(2.25 9.75)"
          width="2.25px"
        />
        <path
          d="M 0 0 L 2.25 0"
          fill="transparent"
          height="1px"
          id="CgUP6NgTJ"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(2.25 14.25)"
          width="2.25px"
        />
        <path
          d="M 0 0 L 0 2.25"
          fill="transparent"
          height="2.25px"
          id="chSlozunM"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 19.5)"
          width="1px"
        />
        <path
          d="M 0 0 L 0 2.25"
          fill="transparent"
          height="2.25px"
          id="UhJ6RJBZt"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(9.75 19.5)"
          width="1px"
        />
        <path
          d="M 0 0 L 0 2.25"
          fill="transparent"
          height="2.25px"
          id="mqRv06PZQ"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 2.25)"
          width="1px"
        />
        <path
          d="M 0 0 L 0 2.25"
          fill="transparent"
          height="2.25px"
          id="w7Vexubmg"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(9.75 2.25)"
          width="1px"
        />
      </svg>
      {"\n"}
      <svg
        id="3532162511"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 9.75 2.726 L 0.96 0.03 C 0.734 -0.036 0.489 0.008 0.3 0.15 C 0.112 0.291 0 0.513 0 0.749 L 0 14.249 C 0 14.485 0.112 14.707 0.3 14.848 C 0.489 14.99 0.734 15.034 0.96 14.968 L 9.75 12.272 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="14.998138042834935px"
          id="yy3HXFDpR"
          transform="translate(3.75 3.751)"
          width="9.75px"
        />
        <path
          d="M 17.46 9.908 C 17.78 9.814 18 9.521 18 9.188 L 18 5.813 C 18 5.479 17.78 5.186 17.46 5.093 L 0.96 0.03 C 0.733 -0.036 0.489 0.008 0.3 0.15 C 0.111 0.292 0 0.514 0 0.75 L 0 14.25 C 0 14.486 0.111 14.708 0.3 14.85 C 0.489 14.992 0.733 15.036 0.96 14.97 Z"
          fill="transparent"
          height="15.000012770180536px"
          id="Ljzjjl6RZ"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3.75 3.75)"
          width="18px"
        />
        <path
          d="M 4.5 8.165 L 4.5 11.523 C 4.5 11.937 4.164 12.273 3.75 12.273 L 0.75 12.273 C 0.336 12.273 0 11.937 0 11.523 L 0 0"
          fill="transparent"
          height="12.2728125px"
          id="pIQN1cCuV"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(13.5 6.477)"
          width="4.5px"
        />
      </svg>
      {"\n"}
      <svg
        id="2989639286"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 10.5 L 0 0 L 6 0 L 6 10.5 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="10.5px"
          id="eXJa_KA13"
          transform="translate(4.5 6.75)"
          width="6px"
        />
        <path
          d="M 0.75 16.5 C 0.336 16.5 0 16.164 0 15.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 5.25 0 C 5.664 0 6 0.336 6 0.75 L 6 15.75 C 6 16.164 5.664 16.5 5.25 16.5 Z"
          fill="transparent"
          height="16.5px"
          id="U5z5OST4e"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(4.5 3.75)"
          width="6px"
        />
        <path
          d="M 8.407 16.286 L 4.018 17.223 C 3.823 17.265 3.619 17.227 3.452 17.117 C 3.285 17.008 3.168 16.837 3.128 16.641 L 0.017 1.851 C -0.07 1.444 0.187 1.044 0.593 0.954 L 4.982 0.016 C 5.177 -0.025 5.381 0.013 5.548 0.122 C 5.716 0.232 5.832 0.403 5.873 0.599 L 8.983 15.389 C 9.07 15.795 8.813 16.196 8.407 16.286 Z"
          fill="transparent"
          height="17.239715027608213px"
          id="G9JcW_ZSV"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(12 3.005)"
          width="9.000110071687757px"
        />
        <path
          d="M 0 0 L 6 0"
          fill="transparent"
          height="1px"
          id="Y4xKi2B6c"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(4.5 6.75)"
          width="6px"
        />
        <path
          d="M 0 0 L 6 0"
          fill="transparent"
          height="1px"
          id="Jb07oZkh3"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(4.5 17.25)"
          width="6px"
        />
        <path
          d="M 0 1.258 L 5.855 0"
          fill="transparent"
          height="1.2581249999999997px"
          id="RArYucI5T"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(12.484 5.818)"
          width="5.854687499999997px"
        />
        <path
          d="M 0 1.258 L 5.856 0"
          fill="transparent"
          height="1.2581250000000068px"
          id="NUkTtevzi"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(13.105 8.777)"
          width="5.855625000000003px"
        />
        <path
          d="M 0 1.258 L 5.855 0"
          fill="transparent"
          height="1.2581250000000068px"
          id="E3uwwvBaM"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.662 16.174)"
          width="5.854687500000011px"
        />
        <path
          d="M 1.105 7.031 L 6.961 5.773 L 5.873 0.599 C 5.832 0.403 5.716 0.232 5.548 0.122 C 5.381 0.013 5.177 -0.025 4.982 0.016 L 0.593 0.954 C 0.187 1.044 -0.07 1.444 0.017 1.851 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="7.030795013804106px"
          id="vmxBepDpn"
          transform="translate(12 3)"
          width="6.960992535843872px"
        />
      </svg>
      {"\n"}
      <svg
        id="1334697013"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 9.001 0 C 5.274 0 1.932 2.297 0.597 5.777 C -0.737 9.257 0.211 13.2 2.982 15.692 L 2.982 15.692 C 4.134 13.426 6.46 12 9.001 12 C 6.93 12 5.251 10.321 5.251 8.25 C 5.251 6.179 6.93 4.5 9.001 4.5 C 11.072 4.5 12.751 6.179 12.751 8.25 C 12.751 10.321 11.072 12 9.001 12 C 11.542 11.999 13.868 13.426 15.02 15.691 C 17.79 13.198 18.738 9.256 17.403 5.777 C 16.069 2.297 12.728 0 9.001 0 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="15.69187501654227px"
          id="UDlyK0_t6"
          transform="translate(2.999 3)"
          width="18.00079583996478px"
        />
        <path
          d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z"
          fill="transparent"
          height="7.5px"
          id="lyIAjQqXV"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(8.25 7.5)"
          width="7.5px"
        />
        <path
          d="M 0 3.694 C 1.151 1.428 3.477 0 6.019 0 C 8.561 0 10.887 1.428 12.037 3.694"
          fill="transparent"
          height="3.6943252075032547px"
          id="V0rHLlVQW"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(5.981 14.997)"
          width="12.037499999999994px"
        />
        <path
          d="M 0 0 L 4.5 0"
          fill="transparent"
          height="1px"
          id="qheb8N54_"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(16.5 5.25)"
          width="4.5px"
        />
        <path
          d="M 0 0 L 0 4.5"
          fill="transparent"
          height="4.5px"
          id="CM5W7I8m5"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(18.75 3)"
          width="1px"
        />
        <path
          d="M 17.861 7.501 C 18.51 11.358 16.591 15.193 13.114 16.986 C 9.637 18.778 5.4 18.118 2.634 15.352 C -0.132 12.586 -0.793 8.349 1 4.872 C 2.793 1.395 6.628 -0.524 10.485 0.125"
          fill="transparent"
          height="17.985736468561875px"
          id="VH8H7tyQ_"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3.015 2.999)"
          width="17.985736468561868px"
        />
      </svg>
      {"\n"}
      <svg
        id="2191839237"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0.75 10.5 C 0.336 10.5 0 10.164 0 9.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 9.75 0 C 10.164 0 10.5 0.336 10.5 0.75 L 10.5 9.75 C 10.5 10.164 10.164 10.5 9.75 10.5 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="10.5px"
          id="SG1Z5vp3C"
          transform="translate(3 6.75)"
          width="10.5px"
        />
        <path
          d="M 0.75 10.5 C 0.336 10.5 0 10.164 0 9.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 9.75 0 C 10.164 0 10.5 0.336 10.5 0.75 L 10.5 9.75 C 10.5 10.164 10.164 10.5 9.75 10.5 Z"
          fill="transparent"
          height="10.5px"
          id="hDq5d7ds2"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3 6.75)"
          width="10.5px"
        />
        <path
          d="M 5.782 0 L 9.532 0 C 9.947 0 10.282 0.336 10.282 0.75 L 10.282 7.5 C 10.282 10.399 7.932 12.75 5.032 12.75 L 5.032 12.75 C 2.71 12.751 0.664 11.225 0 9"
          fill="transparent"
          height="12.750000174514184px"
          id="arkrixk7F"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(7.718 8.25)"
          width="10.282499999999999px"
        />
        <path
          d="M 3 0 L 0 0"
          fill="transparent"
          height="1px"
          id="uKfIDuedZ"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(6.75 9.75)"
          width="3px"
        />
        <path
          d="M 0 4.5 L 0 0"
          fill="transparent"
          height="4.5px"
          id="XzB22ue_H"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(8.25 9.75)"
          width="1px"
        />
        <path
          d="M 0 0 L 3.306 0 C 3.551 0 3.75 0.199 3.75 0.444 L 3.75 6 C 3.75 7.657 2.407 9 0.75 9 L 0.75 9 C 0.678 9 0.606 9 0.534 8.993"
          fill="transparent"
          height="9px"
          id="Imi8wNG4w"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(17.25 8.25)"
          width="3.75px"
        />
        <path
          d="M 0.401 4.499 C -0.242 3.383 -0.102 1.982 0.75 1.016 C 1.602 0.05 2.974 -0.264 4.162 0.234 C 5.349 0.733 6.085 1.933 5.992 3.217 C 5.899 4.502 4.997 5.583 3.75 5.905"
          fill="transparent"
          height="5.9049202356200325px"
          id="zBsoA5N35"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(9.75 2.251)"
          width="6.00008380933366px"
        />
        <path
          d="M 0 0.682 C 0.713 -0.051 1.83 -0.212 2.72 0.291 C 3.61 0.794 4.049 1.833 3.789 2.822 C 3.529 3.811 2.636 4.5 1.613 4.5"
          fill="transparent"
          height="4.500062414350758px"
          id="K2FbSn9Fd"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(15.637 3.75)"
          width="3.8634344394583877px"
        />
      </svg>
      {"\n"}
      <svg
        id="469908671"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0 C 2.568 0.676 4.574 2.682 5.25 5.25"
          fill="transparent"
          height="5.25px"
          id="WzuMf0_io"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 4.5)"
          width="5.25px"
        />
        <path
          d="M 0 0 C 1.549 0.414 2.586 1.451 3 3"
          fill="transparent"
          height="3px"
          id="Ip9lA74Fq"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(13.5 7.5)"
          width="3px"
        />
        <path
          d="M 11.662 10.625 C 11.873 10.485 12.14 10.461 12.373 10.561 L 16.794 12.542 C 17.1 12.672 17.284 12.989 17.244 13.32 C 16.943 15.571 15.021 17.251 12.75 17.25 C 5.708 17.25 0 11.541 0 4.5 C -0.002 2.228 1.679 0.307 3.93 0.005 C 4.26 -0.034 4.577 0.149 4.708 0.455 L 6.689 4.88 C 6.788 5.111 6.765 5.376 6.627 5.586 L 4.624 7.968 C 4.479 8.187 4.46 8.465 4.573 8.701 C 5.348 10.288 6.989 11.909 8.581 12.677 C 8.818 12.789 9.097 12.768 9.315 12.621 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="17.249643127578697px"
          id="Bt6PzjR3u"
          transform="translate(3 3.75)"
          width="17.2496431275787px"
        />
        <path
          d="M 11.662 10.625 C 11.873 10.485 12.14 10.461 12.373 10.561 L 16.794 12.542 C 17.1 12.672 17.284 12.989 17.244 13.32 C 16.943 15.571 15.021 17.251 12.75 17.25 C 5.708 17.25 0 11.541 0 4.5 C -0.002 2.228 1.679 0.307 3.93 0.005 C 4.26 -0.034 4.577 0.149 4.708 0.455 L 6.689 4.88 C 6.788 5.111 6.765 5.376 6.627 5.586 L 4.624 7.968 C 4.479 8.187 4.46 8.465 4.573 8.701 C 5.348 10.288 6.989 11.909 8.581 12.677 C 8.818 12.789 9.097 12.768 9.315 12.621 Z"
          fill="transparent"
          height="17.249643127578697px"
          id="iWLHlotSZ"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3 3.75)"
          width="17.2496431275787px"
        />
      </svg>
      {"\n"}
      <svg viewBox="0 0 12 12" overflow="visible" id="svg-1602672271_396">
        <path
          d="M 1 12 C 1 12 0 12 0 11 C 0 10 1 7 6 7 C 11 7 12 10 12 11 C 12 12 11 12 11 12 Z M 6 6 C 7.657 6 9 4.657 9 3 C 9 1.343 7.657 0 6 0 C 4.343 0 3 1.343 3 3 C 3 4.657 4.343 6 6 6"
          fill="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
        />
      </svg>
    </div>
  );
}

export default SolutionsSvgTemplates;
