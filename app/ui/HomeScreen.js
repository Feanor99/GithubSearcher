import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SectionList, Text, TextInput, View, ActivityIndicator, Alert, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import CategoryType from '../enums/CategoryType';
import GithubRequestState from '../enums/GithubRequestState';
import ListItem from '../models/ListItem';
import GithubRepository from '../repository/GithubRepository';
import colors from '../res/colors';
import styles from '../res/styles';

export default function HomeScreen({ navigation }) {

    const githubRepository = new GithubRepository()
    const [searchText, onChangesearchText] = useState(null);
    const [requestState, setRequestState] = useState(GithubRequestState.none);
    const [users, setUsers] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        switch (requestState) {
            case GithubRequestState.success:
                console.log("success");
                setIsLoading(false);
                break;
            case GithubRequestState.failed:
                console.log("failed");
                setIsLoading(false);
                Alert.alert(
                    "Error",
                    "Failed to fetch data from server",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                setRequestState(GithubRequestState.none)
                break;
            case GithubRequestState.loading:
                console.log("loading");
                setIsLoading(true);
                break;
            case GithubRequestState.none:
                console.log("none");
                break;
            default:
                break;
        }
    }, [requestState]);


    // NOTE: github returns unexpected data if limit exceeded {"message":"API rate limit exceeded for {ip.address}
    // (But here's the good news: Authenticated requests get a higher rate limit.
    // Check out the documentation for more details.)","documentation_url":
    // "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

    const onPressSearchButton = () => {
        console.log("search clicked");
        setRepositories([]);
        setUsers([]);

        if (searchText) {
            setRequestState(GithubRequestState.loading)

            var successCounter = 0;

            githubRepository.searchUser(searchText).then(result => {
                if (result != null) {
                    try {
                        let tempList = []

                        result.items.map(item =>
                            tempList.push(new ListItem(item.login, CategoryType.user, item))
                        );

                        setUsers(tempList)
                        console.log('user search success')

                        if (++successCounter == 2) {
                            setRequestState(GithubRequestState.success)
                        }
                    } catch (error) {
                        console.error(error);
                        setRequestState(GithubRequestState.failed)
                    }

                } else {
                    console.log('user search failed')
                }
            })

            githubRepository.searchRepository(searchText).then(result => {
                if (result != null) {
                    try {
                        let tempList = []

                        result.items.map(item =>
                            tempList.push(new ListItem(item.name, CategoryType.repository, item))
                        );

                        setRepositories(tempList)
                        console.log('repository search success')

                        if (++successCounter == 2) {
                            setRequestState(GithubRequestState.success)
                        }
                    } catch (error) {
                        console.error(error);
                        setRequestState(GithubRequestState.failed)
                    }
                } else {
                    console.log('repository search failed')
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Github Searcher</Text>

            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangesearchText}
                    value={searchText}
                    placeholder="Search users and repositories"
                    error={true}
                />

                <IconButton style={{ flex: 0.2, alignSelf: "center" }}
                    icon="magnify"
                    color={colors.primary}
                    size={28}
                    onPress={onPressSearchButton}
                />

            </View>
            <View style={styles.container_list} state={requestState}>
                <ResponseDataListView users={users} repositories={repositories} isLoading={isLoading} navigation={navigation} />
            </View>
        </View>
    );
}

const ResponseDataListView = (props) => {
    if (props.isLoading === true) {
        return <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color={colors.primary} />
    }

    if (props.users) {
        if (props.users.length === 0 && props.repositories.length === 0) {
            return <Text style={{ alignSelf: 'center' }}>Nothing found</Text>
        }
    } else {
        return null
    }


    return <SectionList
        sections={[
            { title: 'Users', data: props.users },
            { title: 'Repositories', data: props.repositories },
        ]}
        renderItem={({ item }) => {
            return <View style={styles.item_row}>
                <LoadImage avatar_url={item.data.avatar_url} />

                <Text style={styles.item}>{item.name}</Text>

                <IconButton style={{ alignSelf: "flex-end", marginVertical: 0 }}
                    icon="arrow-right"
                    color={colors.primary}
                    size={28}
                    onPress={() => props.navigation.navigate('Detail', {
                        name: item.name,
                        data: item.data,
                    })}
                />

            </View>

        }}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
    />
}

const LoadImage = (props) => {
    if (props.avatar_url) {
        return <Image
            style={styles.tinyLogo}
            source={{
                uri: props.avatar_url,
            }}
        />
    } else {
        return null
    }
}