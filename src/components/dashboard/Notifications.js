import React from "react";
import moment from "moment";
import "./notifications.css";

export const Notifications = ({ notifications }) => {
  if (notifications) {
    return (
      <div className="notifications section">
        <div className="card z-depth-0 recipe-summary">
          <div className="card-content black-text lime lighten-5">
            <h4 className="mt-0">notifications</h4>
            {notifications &&
              notifications.map((notification) => {
                return (
                  <div className="notifications-text" key={notification.id}>
                    {notification.notificationType === "recipe" ? (
                      <i className="fas fa-utensils"></i>
                    ) : (
                      <i className="fas fa-users"></i>
                    )}
                    <strong>{notification.user}</strong> {notification.content}
                    <p>{moment(notification.time.toDate()).fromNow()}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return <h4>no notifications</h4>;
};
