create table user
(
    id       int auto_increment,
    uid      int          not null,
    Username varchar(200) not null,
    Password varchar(200) not null,
    constraint User_id_uindex
        unique (id),
    constraint User_uid_uindex
        unique (uid)
);
