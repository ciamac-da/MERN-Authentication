import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import {
  TableRow,
  TableCell,
  CardActionArea,
  Card,
  CardHeader,
  CardMedia,
  CardContent
} from "@material-ui/core";

const useStyles = withStyles(theme => ({
      root: {
        maxWidth: 345
      },
      media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
      },
      avatar: {
        backgroundColor: red[500]
      }
    }));
    


export default  useStyles( class Profile extends Component {
      constructor() {
            super()
            this.state = {
                  first_name: "",
                  last_name: "",
                  email: ""
            }
      }
      componentDidMount() {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                  first_name: decoded.first_name,
                  last_name: decoded.last_name,
                  email: decoded.email,

            })
      }
      render() {
            const classes = this.props

            return (
                  <div align="center" style={{ marginTop: "5ch" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardHeader
            align="center"
            avatar={<Avatar aria-label="recipe" className={classes.avatar} />}
            title="Willkommen {user}"
            subheader="September 14, 2016"
          />
        </CardActionArea>

        <CardActionArea>
          <CardMedia className={classes.media} image="" title="user photo" />
        </CardActionArea>

        <CardActionArea>
          <CardContent align="center">
            <TableRow>
              <TableCell color="textSecondary">Vorname:</TableCell>
              <TableCell color="textSecondary">{this.state.first_name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell color="textSecondary">Nachname:</TableCell>
              <TableCell color="textSecondary">{this.state.last_name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell color="textSecondary">Email:</TableCell>
              <TableCell color="textSecondary">{this.state.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell color="textSecondary">Roles:</TableCell>
              <TableCell color="textSecondary">player</TableCell>
            </TableRow>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
            )
      }
}
)