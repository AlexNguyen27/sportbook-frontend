import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LockIcon from '@material-ui/icons/Lock';
import Avatar from '@material-ui/core/Avatar';
import TextFieldInputWithHeader from '../../custom/TextFieldInputWithheader';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GET_ERRORS } from '../../../store/actions/types';

const useStyles = makeStyles({
    root: {
        // width: 230,
    },
});

const User = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // FORM DATA STATE
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

    // Click button Login
    const onSubmit = (e) => {
        e.preventDefault();
        history.push('/user/info')
        const error = {};

        Object.keys(formData).map((key) => {
            // console.log("-------------------", formData);
            // console.log(key);
            if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
                error[key] = "This field is required";
            }

            // if (!error[key] && key === "email" && !validateEmail(formData[key])) {
            //   error[key] = "Email is invalid";
            // }
        });

        dispatch({
            type: GET_ERRORS,
            errors: error,
        });

        if (JSON.stringify(error) === "{}") {
            const { username, password } = formData;
            //   loginUser({ username, password });
        }
    };

    // Save on change input value
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Grid container type="flex" justify='center' style={{ paddingTop: '100px' }} >
            <Grid item xs={9} md={2}>
                <Paper className={classes.root}>
                    <Grid container type="flex" justify="center">
                        <Grid item xs={3}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Grid>
                        <Grid item xs={6}>
                            <p>Thanh Nguyen</p>
                            <p>Sửa thông tin của bạn</p>
                        </Grid>
                    </Grid>
                    <hr />
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Thông tin cá nhân</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <SportsSoccerIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Hồ sơ thể thao</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <WatchLaterIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                Lịch đặt của tôi
                                </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <NotificationsActiveIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                Thông báo
                                </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <LockIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                Đổi mật khẩu
                                </Typography>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Grid>
            <Grid item xs={9} md={9}>
                {/* <Paper className={classes.paper}> */}
                <div className="text-center">
                    <h5>Thông tin tài khoản</h5>
                </div>
                <Grid container type="flex" justify="center" spacing={2}>
                    <Grid item xs={4}>
                        <div className='image-wrapper'>
                            <img className='image' alt="avatar" src="https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg" />
                        </div>
                        <div className="text-center">
                            <p>Ảnh đại diện</p>
                        </div>
                        {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    </Grid>
                    <Grid item xs={8}>
                            <form onSubmit={(e) => onSubmit(e)}>
                        <Grid container type="flex" justify="center" spacing={2}>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Họ"
                                    name="username"
                                    className="mt-0"
                                    fullWidth
                                    value={username}
                                    onChange={onChange}
                                    error={''}
                                    placeholder="Enter Username"
                                    variant="outlined"
                                />

                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Tên"
                                    name="username"
                                    className="mt-0"
                                    fullWidth
                                    value={username}
                                    onChange={onChange}
                                    error={''}
                                    placeholder="Enter Username"
                                    variant="outlined"
                                />

                                </Grid>

                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Email"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Số điện thoại"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextFieldInputWithHeader
                                    header="Địa chỉ"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Thành phố"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Quận Huyện"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Ngày sinh"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextFieldInputWithHeader
                                    header="Giới tính"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={password}
                                    error={""}
                                    className="mt-0"
                                    fullWidth
                                    onChange={onChange}
                                    variant="outlined"
                                />
                                </Grid>
                                
                                

                        </Grid>
                                <Button
                                    className="mt-3 w-100"
                                    variant="contained"
                                    style={{ background: '#f08a5d', color: 'white'}}                                    
                                    type="submit"
                                >
                                    CẬP NHẬT
                                </Button>
                            </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default User;