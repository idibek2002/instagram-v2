import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import { Link, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
const Search = ({openModal}) => {
    const [open, setOpen] = React.useState(openModal);
    const anchorRef = React.useRef(null);
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false); 
      };
      function handleListKeyDown(event) {
        // if (event.key === "Tab") {
        //   event.preventDefault();
        //   setOpen(false);
        // } else if (event.key === "Escape") {
        //   setOpen(false);
        // }
      }
      return (
        <div className="flex items-center justify-center relative z-20">
            {/* <button onClick={handleToggle}>Open</button> */}
        <Stack direction="row" spacing={2}>
          <div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start"
                        ? "left top"
                        : "left bottom",
                  }}
                >
                  <Paper
                    className="w-[400px] app:ml-[50px]"
                    style={{
                      backgroundColor: "#373636",
                      borderRadius: "18px",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <Link
                              to={"/account/edit"}
                              onClick={handleClose}
                              className="flex items-center gap-x-[10px] px-[15px] py-[5px] font-[500]"
                              style={{ fontSize: "14px" }}
                            >
                              <svg
                                aria-label="Настройки"
                                class="x1lliihq x1n2onr6"
                                color="rgb(245, 245, 245)"
                                fill="rgb(245, 245, 245)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Настройки</title>
                                <circle
                                  cx="12"
                                  cy="12"
                                  fill="none"
                                  r="8.635"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></circle>
                                <path
                                  d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                              </svg>
                              Настройки
                            </Link>
                          </div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <Link
                              onClick={handleClose}
                              className="flex items-center gap-x-[10px] px-[15px] py-[5px] font-[500]"
                              style={{ fontSize: "14px" }}
                            >
                              <svg
                                aria-label="Ваши действия"
                                class="x1lliihq x1n2onr6"
                                color="rgb(245, 245, 245)"
                                fill="rgb(245, 245, 245)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Ваши действия</title>
                                <path
                                  d="M12 1.505a10.5 10.5 0 1 1-7.424 17.924"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <polyline
                                  fill="none"
                                  points="8.893 15.108 12 12 12.012 12.012 12.012 5.793"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></polyline>
                                <circle
                                  cx="7.24"
                                  cy="2.651"
                                  r="1.125"
                                ></circle>
                                <circle
                                  cx="3.515"
                                  cy="5.83"
                                  r="1.125"
                                ></circle>
                                <circle
                                  cx="1.636"
                                  cy="10.353"
                                  r="1.125"
                                ></circle>
                                <circle
                                  cx="2.01"
                                  cy="15.235"
                                  r="1.125"
                                ></circle>
                              </svg>
                              Ваши действия
                            </Link>
                          </div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <Link
                              onClick={handleClose}
                              className="flex items-center gap-x-[10px] px-[15px] py-[5px] font-[500]"
                              style={{ fontSize: "14px" }}
                            >
                              <svg
                                aria-label="Сохраненное"
                                class="x1lliihq x1n2onr6"
                                color="rgb(245, 245, 245)"
                                fill="rgb(245, 245, 245)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Сохраненное</title>
                                <polygon
                                  fill="none"
                                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></polygon>
                              </svg>
                              Сохраненное
                            </Link>
                          </div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <MenuItem
                              onClick={handleClose}
                              className="flex items-center gap-x-[10px] px-[15px] py-[5px] font-[500]"
                              style={{
                                fontSize: "14px",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <svg
                                aria-label="Сообщение о проблеме"
                                class="x1lliihq x1n2onr6"
                                color="rgb(245, 245, 245)"
                                fill="rgb(245, 245, 245)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Сообщение о проблеме</title>
                                <path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path>
                              </svg>
                              Сообщение о проблеме
                            </MenuItem>
                          </div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <MenuItem
                              onClick={handleClose}
                              className="flex items-center gap-x-[10px] py-[50px]"
                              style={{
                                fontSize: "14px",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              Переключение между аккаунта...
                            </MenuItem>
                          </div>
                          <div className="border-t border-[#5a5a5a] my-[12px] hover:bg-[#514f4f] text-[#FFF]"></div>
                          <div className="mx-[7px] px-[5px] rounded-[7px] py-[8px] hover:bg-[#514f4f] text-[#FFF]">
                            <Link
                              to={"/login"}
                              className="flex items-center px-[15px] py-[5px] font-[500]"
                              style={{
                                fontSize: "14px",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              Выйти
                            </Link>
                          </div>
                        </div>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div></div>
        </Stack>
      </div>
      )
}

export default Search