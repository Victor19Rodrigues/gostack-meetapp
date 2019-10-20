import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';

import {
    Container,
    Banner,
    Info,
    InfoRow,
    Title,
    Time,
    Location,
    Organizer,
} from './styles';

export default function MySubscription({data, handleCancel}) {
    const dateParsed = useMemo(
        () =>
            format(parseISO(data.Meetapp.date), "dd 'de' MMMM 'às' HH:mm", {
                locale: pt,
            }),
        [data.Meetapp.date],
    );

    return (
        <Container>
            <Banner
                source={{
                    uri: data.Meetapp.file
                        ? data.Meetapp.file.url.replace('localhost', '10.0.3.2')
                        : `https://api.adorable.io/avatars/50/${data.Meetapp.user.name}.png`,
                }}
            />

            <Info>
                <Title>{data.Meetapp.title}</Title>
                <InfoRow>
                    <Icon name="event" size={16} color="#999" />
                    <Time>Data: {dateParsed}</Time>
                </InfoRow>
                <InfoRow>
                    <Icon name="location-on" size={16} color="#999" />
                    <Location>Localização: {data.Meetapp.location}</Location>
                </InfoRow>
                <InfoRow last={!data.Meetapp.past}>
                    <Icon name="person" size={16} color="#999" />
                    <Organizer>Organizador: {data.Meetapp.user.name}</Organizer>
                </InfoRow>

                <Button onPress={handleCancel}>Cancelar inscrição</Button>
            </Info>
        </Container>
    );
}

MySubscription.propTypes = {
    data: PropTypes.shape({
        Meetapp: PropTypes.shape({
            title: PropTypes.string.isRequired,
            past: PropTypes.bool,
            date: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            User: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }),
            file: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }).isRequired,
    handleCancel: PropTypes.func.isRequired,
};
