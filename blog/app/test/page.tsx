'use client'
import React, { useCallback, useState } from 'react';
import {
    Button, Menu, List, ListItem, ListDivider, Divider, ExpansionTrigger,
    ExpansionContent,
    ExpansionIcon,
    ExpansionPanel,
} from '@element/react-components';
 
const items = [
    {
        text: 'Internal Link 1',
        href: '/idhub'
    },
    {
        text: 'Internal Link 2',
        to: '/topic2'
    },
    {
        text: '@element/react-components',
        href: 'https://github.platforms.engineering/element/element-react',
        target: '_blank'
    },
    {
        text: '@element/vue-components',
        href: 'https://github.platforms.engineering/element/element-vue',
        target: '_blank'
    },
    {
        text: '@element/themes',
        href: 'https://github.platforms.engineering/element/element-themes-v5',
        target: '_blank'
    }
];
 
function Test() {
 
    const [open, setOpen] = useState(false);
 
    const openMenu = useCallback(() => {
        setOpen(!open);
    }, [open]);
    const closeMenu = useCallback(() => {
        setOpen(false);
    }, []);
    return (
        <div>
            <div>
                <Menu
                    trigger={
                        <Button variant='outlined' onClick={openMenu}>
                            Open Menu
                        </Button>
                    }
                    open={open}
                    surfaceOnly={false}
                    onClose={closeMenu}
                >
                    <div>
                        <List navigation>
                            {items.map((item, index) => {
                                const { text, ...otherProps } = item;
                                return (
                                    <React.Fragment key={item.text}>
                                        <ListItem
                                            key={item.text}
                                            {...otherProps}
                                        >
                                            {text}
                                        </ListItem>
                                        {index < items.length - 1 && <ListDivider />}
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </div>
                </Menu>
            </div>
 
 
            <ExpansionPanel accordion={true}>
      <List nonInteractive>
        <ExpansionTrigger expansionId={1} disabled={false}>
          <ListItem
            disabled={false}
            trailingBlock={
              <ExpansionIcon
                expansionId={1}
                lessIcon={'keyboard_arrow_down'}
                moreIcon={'keyboard_arrow_up'}
              />
            }
            trailingBlockType="icon"
          >
            Expansion Panel 1
          </ListItem>
        </ExpansionTrigger>
        <ExpansionContent expansionId={1}>
          <List>
            <ListItem> Item 1 </ListItem>
            <ListItem> Item 2 </ListItem>
            <ListItem> Item 3 </ListItem>
            <ListItem> Item 4 </ListItem>
          </List>
        </ExpansionContent>
      </List>
    </ExpansionPanel>
        </div>
    )
}
 
export default Test