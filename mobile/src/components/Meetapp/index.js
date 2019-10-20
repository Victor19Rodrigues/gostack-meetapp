import React, {useMemo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Button from '~/components/Button';
import {
    Container,
    Banner,
    Info,
    Title,
    InfoRow,
    InfoText,
    TextPast,
    TextSubscribe,
} from './styles';

export default function Meetapp({data, handleSubmit}) {
    const [subscribe, setSubscribe] = useState(false);

    async function checkSubscribe() {
        const response = await api.get('subscriptions');

        const find = response.data.find(
            meetapp => meetapp.Meetapp.id === data.id,
        );

        if (find) {
            setSubscribe(true);
        }
    }

    useEffect(() => {
        checkSubscribe();
    }, []);

    const dateParsed = useMemo(
        () =>
            format(parseISO(data.date), "dd 'de' MMMM ', às' HH:mm'h'", {
                locale: pt,
            }),
        [data.date],
    );

    return (
        <Container>
            <Banner
                source={{
                    uri:
                        data.file &&
                        // data.File.url.replace('localhost', '10.0.3.2'),
                        data.file.url.replace('localhost', '10.0.3.2'),
                }}
            />
            <Info>
                <Title>{data.title}</Title>
                <InfoRow>
                    <Icon name="event" size={15} color="#999" />
                    <InfoText>{dateParsed}</InfoText>
                </InfoRow>
                <InfoRow>
                    <Icon name="location-on" size={15} color="#999" />
                    <InfoText>{data.location}</InfoText>
                </InfoRow>
                <InfoRow last={!data.past}>
                    <Icon name="person" size={15} color="#999" />
                    <InfoText>Organizador: {data.user.name}</InfoText>
                </InfoRow>
                {data.past ? (
                    <TextPast>Finalizado</TextPast>
                ) : subscribe ? (
                    <TextSubscribe>Inscrito</TextSubscribe>
                ) : (
                    <Button onPress={handleSubmit}>Realizar inscrição</Button>
                )}
            </Info>
        </Container>
    );
}

Meetapp.propTypes = {
    data: PropTypes.shape({
        past: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired,
        file: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        User: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func,
};

Meetapp.defaultProps = {
    handleSubmit: null,
};
