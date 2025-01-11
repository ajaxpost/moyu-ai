import { FC, useMemo } from "react";
import { icons } from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Toolbar } from "@/components/ui/toolbar";
import { Icon } from "@/components/ui/icon";
import { Surface } from "@/components/ui/surface";
import {
  DropdownButton,
  DropdownCategoryTitle,
} from "@/components/ui/dropdown";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>;

interface IProps {
  options: ContentPickerOptions;
}

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerCategory => option.type === "category";

const ContextTypePicker: FC<IProps> = ({ options }) => {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === "option" && option.isActive()),
    [options]
  );

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger>
    //     <Toolbar.Button
    //       active={activeItem?.id !== "paragraph" && !!activeItem?.type}
    //     >
    //       <Icon
    //         name={
    //           (activeItem?.type === "option" && activeItem.icon) || "Pilcrow"
    //         }
    //       />
    //       <Icon name="ChevronDown" className="w-2 h-2" />
    //     </Toolbar.Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>Profile</DropdownMenuItem>
    //     <DropdownMenuItem>Billing</DropdownMenuItem>
    //     <DropdownMenuItem>Team</DropdownMenuItem>
    //     <DropdownMenuItem>Subscription</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          active={activeItem?.id !== "paragraph" && !!activeItem?.type}
        >
          <Icon
            name={
              (activeItem?.type === "option" && activeItem.icon) || "Pilcrow"
            }
          />
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton
                  key={option.id}
                  onClick={option.onClick}
                  isActive={option.isActive()}
                >
                  <Icon name={option.icon} className="w-4 h-4 mr-1" />
                  {option.label}
                </DropdownButton>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>
                    {option.label}
                  </DropdownCategoryTitle>
                </div>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default ContextTypePicker;
