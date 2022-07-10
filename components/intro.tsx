import {
  Navbar, Typography, Menu, MenuHandler, MenuList, MenuItem,
} from '@material-tailwind/react';
import { FaAngleDown as ArrowDown } from 'react-icons/fa';

const Intro = () => (
  <Navbar className=" text-black sticky top-0 rounded-none">
    <div className="w-full flex items-center justify-between text-blue-grey-900">
      <Typography
        as="a"
        href="#"
        variant="small"
        className="mr-4 cursor-pointer py-1.5 font-bold text-2xl"
      >
        Shanpig
      </Typography>
      <ul className="flex items-center gap-6">
        <Typography as="li" variant="small" className="p-1 font-normal">
          <div className="px-4 py-2 rounded-lg transition-all duration-300 hover:cursor-pointer hover:shadow-md flex items-center">
            <Menu>
              <MenuHandler>
                <div className="flex items-center gap-2">
                    <span>Categories</span>
                    <ArrowDown />
                  </div>
              </MenuHandler>
              <MenuList>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </MenuList>
            </Menu>

          </div>
        </Typography>
        <Typography as="li" variant="small" className="p-1 font-normal">
          <div className="flex items-center gap-2">
            <span>About</span>
          </div>
        </Typography>
      </ul>
    </div>
  </Navbar>
);

export default Intro;
